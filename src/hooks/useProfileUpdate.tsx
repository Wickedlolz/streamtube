import { useState } from "react";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { updateProfile } from "firebase/auth";
import { storage } from "@/lib/firebase.config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { toast } from "sonner";

export const useProfileUpdate = (
  selectedImage: File | null,
  username: string
) => {
  const { user, updateUser } = useFirebaseContext();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleSaveChanges = async () => {
    const oldPhotoURL = user?.photoURL;

    setIsUpdating(true);

    if (selectedImage) {
      const storageRef = ref(
        storage,
        `/images/${user!.email}.${selectedImage.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error(error);
          toast("Updating your profile", {
            description: error.message || error.name,
          });
          setIsUpdating(false);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          await updateProfile(user!, {
            ...user,
            displayName: username,
            photoURL: downloadUrl,
          });

          updateUser({
            ...user!,
            displayName: username,
            photoURL: downloadUrl,
          });

          if (oldPhotoURL) {
            const oldImageRef = ref(storage, oldPhotoURL);
            await deleteObject(oldImageRef);
          }

          toast("Updating your profile", {
            description: "Your profile is updated successfully.",
          });

          setIsUpdating(false);
        }
      );
    } else {
      try {
        await updateProfile(user!, { ...user, displayName: username });
        updateUser({ ...user!, displayName: username });
        toast("Updating your profile", {
          description: "Your profile is updated successfully.",
        });
      } catch (error) {
        const { message, name } = error as {
          message: string;
          name: string;
        };
        toast("Updating your profile", {
          description: message || name,
        });
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return { handleSaveChanges, isUpdating };
};
