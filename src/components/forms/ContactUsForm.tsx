'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendEmail } from '@/lib/actions';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    message: z.string().min(10, {
        message: 'Message must be at least 10 characters.',
    }),
});

const ContactUsForm = () => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);

        try {
            const response = await sendEmail(data);
            toast(response.message || response.error);
        } catch (error) {
            toast(error as string);
        } finally {
            setIsSubmitting(false);
            reset();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Name
                </label>
                <Input
                    id="name"
                    {...register('name')}
                    className={`mt-2 ${
                        errors.name ? 'border-red-500' : ''
                    } dark:text-gray-100 dark:border-white`}
                />
                {errors.name && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Email
                </label>
                <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={`mt-2 ${
                        errors.email ? 'border-red-500' : ''
                    } dark:text-gray-100 dark:border-white`}
                />
                {errors.email && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Message
                </label>
                <Textarea
                    id="message"
                    {...register('message')}
                    className={`mt-2 ${
                        errors.message ? 'border-red-500' : ''
                    } dark:text-gray-100 dark:border-white`}
                />
                {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
        </form>
    );
};

export default ContactUsForm;
