import Link from 'next/link';
import { IMovie } from '@/interfaces/movie';
import MotionMovieCard from './MotionMovieCard';

interface MovieGridProps {
    movies: IMovie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
    return (
        <section className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {movies.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/movie/${movie?.id}/${encodeURIComponent(
                        movie.title.toLocaleLowerCase().split(' ').join('-')
                    )}`}
                    className='rounded-lg overflow-hidden'
                >
                    <MotionMovieCard movie={movie} />
                </Link>
            ))}
        </section>
    );
};

export default MovieGrid;
