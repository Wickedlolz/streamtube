'use client';

import { useState } from 'react';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { useProfileUpdate } from '@/hooks/useProfileUpdate';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';

const EditProfile = () => {
    const { user } = useFirebaseContext();
    const [username, setUsername] = useState<string>(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState<string>(user?.photoURL || '');

    const { handleSaveChanges, isUpdating } = useProfileUpdate({
        username,
        photoURL,
    });

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Edit</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when
                        you&apos;re done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            value={username}
                            onChange={(event) =>
                                setUsername(event.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="photo-url" className="text-right">
                            Profile Image URL
                        </Label>
                        <Input
                            id="photo-url"
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={photoURL}
                            onChange={(event) =>
                                setPhotoURL(event.target.value)
                            }
                            className="col-span-3"
                        />
                    </div>
                    {photoURL && (
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Preview</Label>
                            <div className="col-span-3">
                                <Image
                                    src={photoURL}
                                    alt="Profile Preview"
                                    width={96}
                                    height={96}
                                    className="h-24 w-24 rounded-full object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'https://via.placeholder.com/150';
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onClick={handleSaveChanges}>
                            {isUpdating ? 'Saving...' : 'Save changes'}
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default EditProfile;
