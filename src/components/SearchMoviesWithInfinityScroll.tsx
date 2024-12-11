"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { endpoints } from "@/lib/endpoints";

import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

type SearchMoviesWithInfinityScrollProps = {
  searchQuery: string;
};

const SearchMoviesWithInfinityScroll = ({
  searchQuery,
}: SearchMoviesWithInfinityScrollProps) => {
  const url = new URL(endpoints.searchMovie);
  url.searchParams.set("query", decodeURI(searchQuery));
  const { data, isFetchingNextPage, isLoading } = useInfiniteScroll(
    url,
    "search",
    searchQuery
  );

  if (isLoading) {
    return (
      <section className="py-10 max-w-screen-xl mx-auto">
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
              "flex flex-col space-y-5 mb-5 items-center lg:flex-row space-x-5"
            }
          >
            <MovieCard movie={movie} />
            <div className="max-w-2xl">
              <p className="font-bold dark:text-white">
                {movie?.title} ({movie?.release_date?.split("-")[0]})
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
    </div>
  );
};

export default SearchMoviesWithInfinityScroll;
