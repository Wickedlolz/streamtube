import { Metadata } from "next";
import Link from "next/link";

import SignInForm from "@/components/SignInForm";
import SignInWithGoogleButton from "@/components/SignInWithGoogleButton";

export const metadata: Metadata = {
  title: "Sign In | StreamTube",
};

export default function LoginPage() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <SignInWithGoogleButton />
            <div className="flex items-center justify-center">
              <hr className="flex-grow border-t border-gray-300" />
              <span className="px-4 text-gray-600 text-xs dark:text-white">
                OR CONTINUE WITH
              </span>
              <hr className="flex-grow border-t border-gray-300" />
            </div>
            <SignInForm />
            <p className="text-slate-600 text-center dark:text-white">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-black font-bold dark:text-slate-400"
              >
                Let&apos;s make one.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
