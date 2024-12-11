"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, "Password must be at least 5 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

const SignUpForm = () => {
  const navigate = useRouter();
  const { signUp } = useFirebaseContext();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    setErrorMessage("");

    try {
      await signUp(values.email, values.password);
      form.reset();
      navigate.push("/");
    } catch (error) {
      const { message } = error as { message: string };
      setErrorMessage(`Failed to sign up. ${message}`);
      console.error(error);
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
              <FormLabel htmlFor="email" className="dark:text-white">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="m@example.com"
                  {...field}
                  className="dark:text-white"
                />
              </FormControl>
              {form.formState.errors.email && (
                <FormMessage>{form.formState.errors.email.message}</FormMessage>
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="dark:text-white">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  {...field}
                  className="dark:text-white"
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
          <div className="text-red-500 text-center">{errorMessage}</div>
        )}
        <Button disabled={isPending} className="w-full mt-4">
          Create account
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;
