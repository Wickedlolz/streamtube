import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { useState, ChangeEvent } from "react";

export const useImagePreview = () => {
  const { user } = useFirebaseContext();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(user?.photoURL || "");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setPreviewUrl("");
    }
  };

  return { selectedImage, previewUrl, handleImageChange };
};
