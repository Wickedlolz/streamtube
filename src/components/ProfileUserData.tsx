"use client";

import { useRouter } from "next/navigation";
import { useFirebaseContext } from "@/contexts/FirebaseContext";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import EditProfile from "./EditProfile";

const ProfileUserData = () => {
  const navigate = useRouter();
  const { user, logOut } = useFirebaseContext();

  const handleLogout = async () => {
    await logOut();
    navigate.replace("/");
  };

  if (!user) {
    return null;
  }

  return (
    <section className="flex flex-col justify-center items-center gap-2 bg-gray-700 w-80 h-60 rounded-lg drop-shadow-lg">
      <Avatar>
        <AvatarImage
          src={user?.photoURL || undefined}
          className="object-cover rounded-full"
          width={60}
          height={60}
          alt={user?.displayName || "User Photo"}
        />
        <AvatarFallback className="dark:bg-black">
          {user?.email?.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="text-white text-sm flex flex-col items-center gap-4">
        {user?.displayName ? (
          <p>
            <span className="font-bold">Username: </span> {user?.displayName}
          </p>
        ) : null}
        <p>
          <span className="font-bold">Email: </span>
          {user?.email}
        </p>
        <div className="flex gap-2">
          <EditProfile />
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    </section>
  );
};

export default ProfileUserData;
