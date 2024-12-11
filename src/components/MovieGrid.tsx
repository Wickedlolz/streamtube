import Link from "next/link";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";
import { IMovie } from "@/interfaces/movie";

interface MovieGridProps {
  movies: IMovie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <article
          key={movie.id}
          className="flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
        >
          <Image
            src={getImagePath(movie.poster_path || movie.backdrop_path)}
            alt={movie.title}
            width={300}
            height={450}
            className="object-cover rounded-lg mb-2"
          />
          <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
            {movie.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            {movie.release_date}
          </p>
          <Link
            href={`/movie/${movie?.id}/${movie.title
              .toLocaleLowerCase()
              .split(" ")
              .join("-")}`}
            className="mt-auto text-center inline-block border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-400 px-4 py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            View Details
          </Link>
        </article>
      ))}
    </section>
  );
};

export default MovieGrid;
