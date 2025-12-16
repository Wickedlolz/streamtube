import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | StreamTube",
};

export default function NotFound() {
  return (
    <section className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white dark:bg-black">
      <div className="text-center">
        <div className="inline-flex rounded-full bg-sky-100 dark:bg-sky-900 p-4">
          <div className="rounded-full stroke-sky-600 dark:stroke-sky-400 bg-sky-200 dark:bg-sky-800 p-4">
            <svg
              className="w-16 h-16"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <h1 className="mt-5 text-[36px] font-bold text-slate-800 dark:text-slate-200 lg:text-[50px]">
          404 - Page not found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-5 lg:text-lg">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors inline-block"
          >
            Go back home
          </Link>
        </div>
      </div>
    </section>
  );
}
