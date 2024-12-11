import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Conditions | StreamTube",
};

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-gray-100 dark:bg-[#191919] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-6 transition-colors duration-300">
          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using StreamTube, you agree to be bound by these
              Terms and Conditions, our Privacy Policy, and all applicable laws
              and regulations. If you do not agree with any part of these terms,
              you may not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. Description of Service
            </h2>
            <p>
              StreamTube is a platform that allows users to browse, search, and
              stream movies. We use Firebase for account management and storing
              user preferences, and The Movie Database (TMDB) API for retrieving
              movie information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. User Accounts</h2>
            <p>
              To access certain features of our service, you must create an
              account using Firebase. You are responsible for maintaining the
              confidentiality of your account and password. You agree to accept
              responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. Content and Copyright
            </h2>
            <p>
              All content provided on StreamTube, including movies, trailers,
              images, and text, is protected by copyright and other intellectual
              property laws. Movie information is sourced from TMDB API and is
              subject to their terms of use. Users may not download, copy, or
              share any content unless explicitly permitted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. User Conduct</h2>
            <p>Users agree not to use the service to:</p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on the rights of others</li>
              <li>
                Attempt to gain unauthorized access to any part of the service,
                including Firebase or TMDB API
              </li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>
                Collect or store personal data about other users without their
                consent
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. Third-Party Services
            </h2>
            <p>
              Our service uses Firebase and TMDB API. By using our service, you
              agree to comply with their respective terms of service:
            </p>
            <ul className="list-disc list-inside mt-2 ml-4">
              <li>
                Firebase:{" "}
                <Link
                  href="https://firebase.google.com/terms"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Firebase Terms of Service
                </Link>
              </li>
              <li>
                TMDB API:{" "}
                <Link
                  href="https://www.themoviedb.org/terms-of-use"
                  target="_blank"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  TMDB Terms of Use
                </Link>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. Privacy and Data Protection
            </h2>
            <p>
              Your use of our service is also governed by our Privacy Policy,
              which outlines how we collect, use, and protect your personal
              information, including data stored in Firebase and interactions
              with TMDB API.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              8. Modifications to the Service
            </h2>
            <p>
              We reserve the right to modify or discontinue, temporarily or
              permanently, the service (or any part thereof) with or without
              notice. This includes changes to Firebase integration or TMDB API
              usage.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">9. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the service
              immediately, without prior notice or liability, for any reason,
              including breach of these Terms and Conditions. Upon termination,
              your right to use the service will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              10. Limitation of Liability
            </h2>
            <p>
              StreamTube, Firebase, and TMDB shall not be liable for any
              indirect, incidental, special, consequential or punitive damages,
              including loss of profits, data, or use, arising out of or in
              connection with these Terms or the use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time.
              It is your responsibility to check these Terms periodically for
              changes. Your continued use of the service after any changes
              constitute acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">12. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              terms@moviestreamingstudio.com.
            </p>
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
