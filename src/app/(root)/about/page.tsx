import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | StreamTube",
};

export default function AboutUsPage() {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-[#191919] py-12 transition-colors duration-300">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center mb-20">
          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg">
              Welcome to <span className="font-bold">StreamTube</span>, your
              ultimate destination for exploring, discovering, and streaming the
              best movies. Our goal is to create a personalized experience where
              movie lovers can find and enjoy their favorite films effortlessly.
            </p>
          </div>
          <div className="hidden lg:block">
            <Image
              src="https://plus.unsplash.com/premium_photo-1683740128975-7d85e415635d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Movies Graphic"
              className="rounded-lg shadow-lg"
              width={500}
              height={300}
            />
          </div>
        </div>

        {/* Our Mission Section */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://plus.unsplash.com/premium_photo-1722686518316-c400980cc824?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mission Graphic"
                className="rounded-lg shadow-lg"
                width={500}
                height={300}
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                At <span className="font-bold">StreamTube</span>, our mission is
                to revolutionize the way you discover and enjoy films. We
                believe in creating a seamless, user-friendly platform that
                offers personalized movie recommendations, comprehensive
                details, and a fantastic viewing experience on any device.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-4">
                Whether you’re a movie enthusiast or a casual viewer, we aim to
                deliver an enjoyable and efficient way to explore the world of
                cinema, tailored to your tastes and preferences.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Vast Movie Library
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Dive into our extensive collection, from blockbusters to hidden
                gems, and watch trailers or explore actor bios.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Personalized Lists
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Like and curate your favorite movies into personalized lists
                linked to your account.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Advanced Search
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Easily find movies by title or genre, and discover new films
                that match your preferences using our search tool.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Responsive Design
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Enjoy a seamless experience on any device, whether it’s your
                phone, tablet, or laptop.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12">
            Meet Our Team
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-10">
            {/* Team Member 1 */}
            <div className="text-center">
              <Image
                className="w-36 h-36 mx-auto rounded-full object-cover shadow-lg"
                src="https://avatars.githubusercontent.com/u/52072434?v=4"
                alt="Viktor"
                width={144}
                height={144}
              />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-6">
                Viktor Dimitrov
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Front-End Developer
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
