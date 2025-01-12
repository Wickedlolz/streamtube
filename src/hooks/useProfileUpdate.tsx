import { useState } from 'react';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { updateProfile } from 'firebase/auth';
import { toast } from 'sonner';

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

            toast('Updating your profile', {
                description: 'Your profile is updated successfully.',
            });
        } catch (error) {
            const { message, name } = error as {
                message: string;
                name: string;
            };
            toast('Updating your profile', {
                description: message || name,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    return { handleSaveChanges, isUpdating };
};
