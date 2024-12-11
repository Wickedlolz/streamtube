import { Metadata } from "next";
import ContactUsForm from "@/components/ContactUsForm";

export const metadata: Metadata = {
  title: "Contact Us | StreamTube",
};

export default function ContactUs() {
  return (
    <section className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[#191919] transition-colors duration-200">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Contact Us
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Have questions about StreamTube? We&apos;re here to help! Fill out
            the form below, and we&apos;ll get back to you as soon as possible.
          </p>

          <ContactUsForm />
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Other Ways to Reach Us
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Email
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                support@streamtube.com
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Phone
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                +1 (555) 123-4567
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Address
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                123 Movie Lane
                <br />
                Hollywood, CA 90001
                <br />
                United States
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
