import { useState } from "react";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { updateProfile } from "firebase/auth";
import { toast } from "sonner";

type ProfileData = {
  username: string;
  photoURL?: string;
};

export const useProfileUpdate = ({ username, photoURL }: ProfileData) => {
  const { user, updateUser } = useFirebaseContext();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleSaveChanges = async () => {
    setIsUpdating(true);

    try {
      await updateProfile(user!, {
        displayName: username,
        ...(photoURL && { photoURL }),
      });

      updateUser({
        ...user!,
        displayName: username,
        ...(photoURL && { photoURL }),
      });

      toast.success("Profile updated successfully", {
        description: "Your profile information has been updated.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update profile";
      toast.error("Update failed", {
        description: errorMessage,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return { handleSaveChanges, isUpdating };
};
