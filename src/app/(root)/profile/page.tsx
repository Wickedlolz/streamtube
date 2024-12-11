import { Metadata } from "next";

import ProfileUserData from "@/components/ProfileUserData";
import ProfileUserMovieCollections from "@/components/ProfileUserMovieCollections";

export const metadata: Metadata = {
  title: "Profile | StreamTube",
};

export default async function ProfilePage() {
  return (
    <section>
      <section className="dark:text-white flex flex-col items-center py-5 w-full">
        <ProfileUserData />
      </section>
      <ProfileUserMovieCollections />
    </section>
  );
}
