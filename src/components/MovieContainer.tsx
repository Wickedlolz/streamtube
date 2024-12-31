'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { requester } from '@/lib/actions';
import { IMovie, ISearchResults } from '@/interfaces/movie';

import MovieCard from './MovieCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MovieContainerProps = {
    title?: string;
    url: string;
    isVertical?: boolean;
    showBtn?: boolean;
};

const MovieContainer = ({
    title,
    url,
    isVertical,
    showBtn = true,
}: MovieContainerProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: [title ?? 'default-title', url],
        queryFn: () => requester<ISearchResults>(url),
    });
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (containerRef.current && containerRef.current.scrollLeft > 0) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (
            containerRef.current &&
            containerRef.current.scrollWidth -
                containerRef.current.clientWidth >
                containerRef.current.scrollLeft
        ) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    if (isLoading) {
        return (
            <section className='flex items-center justify-center py-10'>
                <article>
                    <div className='animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50 mx-auto'></div>
                    <p className='text-xl text-gray-500'>Loading movies...</p>
                </article>
            </section>
        );
    }

    if (isError) {
        return (
            <section className='flex items-center justify-center py-10'>
                <p className='text-xl text-red-500 font-bold'>
                    Error loading movies. Please try again later.
                </p>
            </section>
        );
    }

    return (
        <>
            <div className='mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4'>
                <h2 className='text-sm uppercase font-bold tracking-wider dark:text-white'>
                    {title}
                </h2>
                {showBtn && (
                    <Link
                        href={`/viewmore?title=${title}`}
                        className='bg-gray-800 text-xs text-white uppercase px-4 py-2 rounded-md border-indigo-600 font-semibold hover:bg-black duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-600'
                    >
                        View more
                    </Link>
                )}
                <span className='w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10' />
            </div>
            <div className='relative'>
                {!isVertical && (data?.results?.length ?? 0) > 0 ? (
                    <button
                        onClick={scrollLeft}
                        className='carousel-btn-left'
                        aria-label='Scroll left to view more movies'
                    >
                        <ChevronLeft />
                    </button>
                ) : null}
                <div
                    ref={containerRef}
                    className={cn(
                        'flex space-x-4 overflow-scroll px-5 lg:px-10 py-5 scrollbar-hide',
                        isVertical && 'flex-col space-x-0 space-y-12'
                    )}
                >
                    {data?.results?.length === 0 ? (
                        <div className='text-center text-lg text-gray-500'>
                            No movies found. Please try again later.
                        </div>
                    ) : (
                        data?.results?.map((movie: IMovie) =>
                            isVertical ? (
                                <div
                                    key={movie.id}
                                    className={cn(
                                        isVertical &&
                                            'flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5'
                                    )}
                                >
                                    <MovieCard movie={movie} />
                                    <div className='max-w-2xl'>
                                        <p className='font-bold dark:text-white'>
                                            {movie?.title} (
                                            {movie?.release_date?.split('-')[0]}
                                            )
                                        </p>
                                        <hr className='mb-3' />
                                        <p className='dark:text-white'>
                                            {movie?.overview}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <MovieCard key={movie.id} movie={movie} />
                            )
                        )
                    )}
                </div>
                {!isVertical && (data?.results?.length ?? 0) > 0 ? (
                    <button
                        onClick={scrollRight}
                        className='carousel-btn-right'
                        aria-label='Scroll right to view more movies'
                    >
                        <ChevronRight />
                    </button>
                ) : null}
            </div>
        </>
    );
};

export default MovieContainer;
