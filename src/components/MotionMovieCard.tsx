'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IMovie, IMovieDetails } from '@/interfaces/movie';
import { Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { getImagePath } from '@/lib/getImagePath';

type MovieCardProps = {
    movie: IMovieDetails | IMovie;
};

const MotionMovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card className='rounded-lg'>
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            >
                <CardContent className='p-0 relative rounded-lg'>
                    <Image
                        src={getImagePath(
                            movie.poster_path || movie.backdrop_path
                        )}
                        alt={movie.title}
                        className='w-full h-auto object-cover'
                        width={500}
                        height={300}
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black to-transparent md:opacity-0 md:hover:opacity-100 transition-opacity duration-300'>
                        <div className='absolute bottom-0 left-0 right-0 p-4'>
                            <h3 className='text-white font-bold text-lg mb-2 line-clamp-2'>
                                {movie.title}
                            </h3>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <Star className='text-yellow-400 w-4 h-4 mr-1' />
                                    <span className='text-white text-sm'>
                                        {movie.vote_average.toFixed(1)}
                                    </span>
                                </div>
                                <span className='text-white text-sm'>
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </motion.div>
        </Card>
    );
};

export default MotionMovieCard;
