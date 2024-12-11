import { Metadata } from "next";
import Link from "next/link";

import SignInWithGoogleButton from "@/components/SignInWithGoogleButton";
import SignUpForm from "@/components/SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up | StreamTube",
};

export default function RegisterPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <SignInWithGoogleButton />
            <div className="flex items-center justify-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-600 text-xs dark:text-white">
                OR CONTINUE WITH
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <SignUpForm />
            <p className="text-slate-600 text-center dark:text-white">
              You have an account? Let&apos;s{" "}
              <Link
                href="/login"
                className="text-black font-bold dark:text-slate-400"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
