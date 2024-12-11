import Link from "next/link";
import { IMovie, IMovieDetails } from "@/interfaces/movie";
import Image from "next/image";
import { getImagePath } from "@/lib/getImagePath";

type MovieCardProps = {
  movie: IMovie | IMovieDetails;
};

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      href={`/movie/${movie?.id}/${encodeURIComponent(
        movie.title.toLocaleLowerCase().split(" ").join("-")
      )}`}
      className="relative flex-shrink-0 cursor-pointer transform transition-transform duration-300 ease-out hover:scale-105 hover:shadow-xl hover:shadow-gray-900/50"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/80 z-10" />

      <p className="absolute z-20 bottom-5 left-5 text-white text-sm lg:text-base font-medium line-clamp-1">
        {movie?.title}
      </p>
      <Image
        src={getImagePath(movie?.backdrop_path)}
        alt={movie.title}
        width={1920}
        height={1080}
        className="w-fit h-48 sm:h-56 lg:min-w-[400px] object-cover shadow-md shadow-gray-900 drop-shadow-xl"
        loading="lazy"
      />
    </Link>
  );
};

export default MovieCard;
