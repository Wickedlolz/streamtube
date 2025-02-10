'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getDiscoverMovies } from '@/lib/actions';
import Autoplay from 'embla-carousel-autoplay';

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { getImagePath } from '@/lib/getImagePath';

const HeroCarousel = () => {
    const autoplayRef = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    const { data, isLoading, isError } = useQuery({
        queryKey: ['discover-movies'],
        queryFn: () => getDiscoverMovies(),
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-[400px] lg:h-[550px] bg-gray-900 text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50 mx-auto"></div>
                    <p className="mt-4 text-lg font-semibold">
                        Loading movies...
                    </p>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-[400px] lg:h-[550px] bg-red-600 text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Something went wrong</h2>
                    <p className="mt-2 text-base">
                        Error loading movies. Please try again later.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Carousel
            plugins={[autoplayRef.current]}
            onMouseEnter={() => autoplayRef.current.stop()}
            onMouseLeave={() => autoplayRef.current.play()}
        >
            <CarouselContent className="-ml-2 md:-ml-4">
                {data?.map((movie) => (
                    <CarouselItem
                        key={movie.id}
                        className="pl-2 md:pl-4 relative group"
                    >
                        <Link
                            href={`/movie/${movie?.id}/${encodeURIComponent(
                                movie.title
                                    .toLocaleLowerCase()
                                    .split(' ')
                                    .join('-')
                            )}`}
                            className="flex-full min-w-0"
                        >
                            <div className="absolute top-0 left-0 h-full w-full bg-linear-to-r from-gray-900/90 via-transparent to-transparent group-hover:from-black/70 group-hover:to-transparent transition-colors duration-300 ease-in-out"></div>
                            <Image
                                src={getImagePath(movie?.backdrop_path, true)}
                                alt={movie.title || movie.original_title}
                                width={1920}
                                height={550}
                                loading="lazy"
                                className="w-full h-[400px] lg:h-[550px] object-cover"
                            />
                            <div className="inline absolute top-0 pt-40 xl:pt-[14rem] left-0 bg-transparent z-20 h-full w-full bg-linear-to-r from-gray-900/90 via-transparent to-transparent p-20 space-y-5 text-white">
                                <h2 className="text-xl md:text-5xl font-bold max-w-xl">
                                    {movie?.title}
                                </h2>
                                <p className="max-w-xl text-xs md:text-base line-clamp-3">
                                    {movie?.overview}
                                </p>
                            </div>
                        </Link>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
            />
            <CarouselNext
                aria-label="Next slide"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-600"
            />
        </Carousel>
    );
};

export default HeroCarousel;
