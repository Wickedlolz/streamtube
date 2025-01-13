import { Metadata } from 'next';

import ProfileUserData from '@/components/pages/profile/ProfileUserData';
import ProfileUserMovieCollections from '@/components/pages/profile/ProfileUserMovieCollections';

export const metadata: Metadata = {
    title: 'Profile | StreamTube',
};

export default async function ProfilePage() {
    return (
        <section className="container mx-auto px-4 py-8">
            <ProfileUserData />
            <ProfileUserMovieCollections />
        </section>
    );
}
