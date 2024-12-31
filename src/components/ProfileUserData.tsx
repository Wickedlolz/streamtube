'use client';

import { useRouter } from 'next/navigation';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { motion } from 'framer-motion';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from './ui/button';
import EditProfile from './EditProfile';
import { Card, CardContent } from './ui/card';

const ProfileUserData = () => {
    const navigate = useRouter();
    const { user, logOut } = useFirebaseContext();

    const handleLogout = async () => {
        await logOut();
        navigate.replace('/');
    };

    if (!user) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card className='mb-8'>
                <CardContent className='flex flex-col md:flex-row items-center gap-6 p-6'>
                    <Avatar className='w-24 h-24 md:w-32 md:h-32'>
                        <AvatarImage
                            src={user.photoURL!}
                            className='object-cover'
                            alt={user?.displayName || 'User Photo'}
                        />
                        <AvatarFallback className='text-2xl'>
                            {user?.email?.charAt(0).toLocaleUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-center md:items-start gap-4'>
                        {user?.displayName && (
                            <h2 className='text-2xl font-bold'>
                                {user.displayName}
                            </h2>
                        )}
                        <p className='text-muted-foreground'>{user?.email}</p>
                        <div className='flex gap-2'>
                            <EditProfile />
                            <Button variant='outline' onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default ProfileUserData;
