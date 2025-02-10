'use client';

import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { endpoints } from '@/lib/endpoints';

import MovieCard from './MovieCard';
import Spinner from './common/Spinner';
import { Button } from './ui/button';

type GenreMoviesWithInfinityScrollProps = {
    genre: string;
    genreId: string;
};

const GenreMoviesWithInfinityScroll = ({
    genre,
    genreId,
}: GenreMoviesWithInfinityScrollProps) => {
    const url = new URL(endpoints.discoverMovies);
    if (genreId) {
        url.searchParams.set('with_genres', genreId);
    }

    const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useInfiniteScroll(url, ['genre'], genre);

    if (isLoading) {
        return (
            <section className="py-10 max-w-(--breakpoint-xl) mx-auto">
                <Spinner />
            </section>
        );
    }

    return (
        <div className="flex  overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide flex-col space-x-0 space-y-12">
            {data?.pages?.map(({ results }) => {
                return results.map((movie) => (
                    <div
                        key={movie.id}
                        className={
                            'flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5'
                        }
                    >
                        <MovieCard movie={movie} />
                        <div className="max-w-2xl">
                            <p className="font-bold dark:text-white">
                                {movie?.title} (
                                {movie?.release_date?.split('-')[0]})
                            </p>
                            <hr className="mb-3" />
                            <p className="dark:text-white">{movie?.overview}</p>
                        </div>
                    </div>
                ));
            })}
            {isFetchingNextPage && (
                <p className="text-white font-bold text-center">
                    Loading next movies&hellip;
                </p>
            )}
            {hasNextPage && (
                <Button
                    onClick={() => fetchNextPage()}
                    className="block mx-auto mt-5 px-6 py-2 bg-red-600 text-white font-bold rounded-lg transition-colors duration-300 hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
                    disabled={isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
            )}
        </div>
    );
};

export default GenreMoviesWithInfinityScroll;
