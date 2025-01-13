'use client';

import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { useQuery } from '@tanstack/react-query';
import { getUserCollections } from '@/lib/actions';

import Spinner from '@/components/common/Spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileMovieCollection from '@/components/pages/profile/ProfileMovieCollection';

const ProfileUserMovieCollections = () => {
    const { user } = useFirebaseContext();
    const { data, isLoading } = useQuery({
        queryKey: ['userCollections', user?.uid],
        queryFn: () => getUserCollections(user!.email!),
        enabled: !!user,
    });

    if (!user && isLoading) {
        return <Spinner />;
    }

    return (
        <Tabs defaultValue="liked" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="liked">Liked Movies</TabsTrigger>
                <TabsTrigger value="watchlist">Watch List</TabsTrigger>
            </TabsList>
            <TabsContent value="liked">
                <ProfileMovieCollection
                    title="Liked Movies"
                    movies={data?.likedMovies}
                />
            </TabsContent>
            <TabsContent value="watchlist">
                <ProfileMovieCollection
                    title="Watch List"
                    movies={data?.watchList}
                />
            </TabsContent>
        </Tabs>
    );
};

export default ProfileUserMovieCollections;
