import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | StreamTube",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-gray-100 dark:bg-[#191919] min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
          Privacy Policy
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              1. Introduction
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              StreamTube is committed to protecting your privacy. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you use our service, including our use of
              Firebase for account management and The Movie Database (TMDB) API
              for movie information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              2. Information We Collect
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We collect information you provide directly to us and information
              from third-party services, such as:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 ml-4">
              <li>
                Personal information (e.g., name, email address) when you create
                an account through Firebase
              </li>
              <li>
                Your movie preferences and liked movies, stored in Firebase
              </li>
              <li>Information about your device and how you use our service</li>
              <li>
                Movie data retrieved from TMDB API based on your interactions
                with our service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mt-2 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>
                Personalize your experience and recommend movies based on your
                preferences and liked movies
              </li>
              <li>
                Authenticate your account and manage your session using Firebase
              </li>
              <li>Retrieve and display movie information from TMDB API</li>
              <li>Communicate with you about our service</li>
              <li>Monitor and analyze trends and usage</li>
              <li>
                Protect against, identify, and prevent fraud and other illegal
                activity
              </li>
            </ul>
          </section>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
