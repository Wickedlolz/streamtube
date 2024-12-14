'use client';

import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { useQuery } from '@tanstack/react-query';
import { getUserCollections } from '@/lib/actions';

import MovieCard from './MovieCard';
import Spinner from './Spinner';

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
        <section className="flex flex-col space-y-2">
            <div className="mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-sm uppercase font-bold tracking-wider dark:text-white">
                    Liked Movies
                </h2>

                <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
            </div>
            <div className="flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide">
                {data?.likedMovies.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))}
            </div>

            <div className="mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-sm uppercase font-bold tracking-wider dark:text-white">
                    Watch List
                </h2>

                <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
            </div>
            <div className="flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide">
                {data?.watchList?.map((movie) => (
                    <MovieCard key={movie?.id} movie={movie} />
                ))}
            </div>
        </section>
    );
};

export default ProfileUserMovieCollections;
