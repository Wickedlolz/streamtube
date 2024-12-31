import Link from 'next/link';
import { motion } from 'framer-motion';
import { IMovieDetails } from '@/interfaces/movie';

import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import MotionMovieCard from './MotionMovieCard';

type ProfileMovieCollectionProps = {
    title: string;
    movies: IMovieDetails[] | undefined;
};

const ProfileMovieCollection = ({
    title,
    movies,
}: ProfileMovieCollectionProps) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <section className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {movies?.map((movie) => (
                    <motion.article
                        key={movie?.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className='rounded-lg overflow-hidden'
                    >
                        <Link
                            href={`/movie/${movie?.id}/${encodeURIComponent(
                                movie?.title
                                    .toLocaleLowerCase()
                                    .split(' ')
                                    .join('-')
                            )}`}
                        >
                            <MotionMovieCard movie={movie} />
                        </Link>
                    </motion.article>
                ))}
            </section>
        </CardContent>
    </Card>
);

export default ProfileMovieCollection;
