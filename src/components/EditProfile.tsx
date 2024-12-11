"use client";

import { useState } from "react";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";
import { useImagePreview } from "@/hooks/useImagePreview";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const EditProfile = () => {
  const { user } = useFirebaseContext();
  const { selectedImage, previewUrl, handleImageChange } = useImagePreview();
  const [username, setUsername] = useState<string>(user?.displayName || "");
  const { handleSaveChanges, isUpdating } = useProfileUpdate(
    selectedImage,
    username
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Edit</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profile-image" className="text-right">
              Profile Image
            </Label>
            <Input
              id="profile-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="col-span-3"
            />
          </div>
          {previewUrl && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Preview</Label>
              <Image
                src={previewUrl}
                alt="Profile Preview"
                width={96}
                height={96}
                className="col-span-3 h-24 w-24 object-cover"
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleSaveChanges}>
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default EditProfile;
