'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
    email: z.string().email(),
    password: z
        .string()
        .min(5, 'Password must be at least 5 characters long')
        .max(20, 'Password must be at most 20 characters long'),
});

const SignInForm = () => {
    const navigate = useRouter();
    const { signIn } = useFirebaseContext();
    const [isPending, setIsPending] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsPending(true);
        setErrorMessage('');

        try {
            await signIn(values.email, values.password);
            form.reset();
            navigate.push('/');
        } catch (error) {
            const { message } = error as { message: string };
            setErrorMessage(`Failed to sign in. ${message}`);
        } finally {
            setIsPending(false);
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="dark:text-white">
                                Email
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="email"
                                    placeholder="m@example.com"
                                    {...field}
                                    className="bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
                                />
                            </FormControl>
                            {form.formState.errors.email && (
                                <FormMessage>
                                    {form.formState.errors.email.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="dark:text-white">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    id="password"
                                    type="password"
                                    {...field}
                                    className="bg-white dark:bg-black text-black dark:text-white border-gray-200 dark:border-gray-800"
                                />
                            </FormControl>
                            {form.formState.errors.password && (
                                <FormMessage>
                                    {form.formState.errors.password.message}
                                </FormMessage>
                            )}
                        </FormItem>
                    )}
                />
                {errorMessage && (
                    <div className="text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}
                <Button disabled={isPending} className="w-full mt-4">
                    Log In
                </Button>
            </form>
        </Form>
    );
};

export default SignInForm;
