"use client";

import { IMovieDetails } from "@/interfaces/movie";
import { cn } from "@/lib/utils";
import { useState } from "react";

type MovieOverviewProps = {
  movie: IMovieDetails;
};

export default function MovieOverview({ movie }: MovieOverviewProps) {
  const [show, setShow] = useState<boolean>(false);

  const toggleShow = () => setShow((state) => !state);

  return (
    <p className="sm:text-base xs:text-[15.75px] text-[14.25px] leading-relaxed">
      <span>
        {movie?.overview?.length > 280 && !show
          ? `${movie?.overview.slice(0, 280)}...`
          : movie?.overview}
      </span>
      <button
        type="button"
        className={cn(
          `font-bold ml-1 hover:underline transition-all duration-300`,
          movie!.overview.length > 280 ? "inline-block" : "hidden"
        )}
        onClick={toggleShow}
        aria-expanded={show ? "true" : "false"}
      >
        {!show ? "show more" : "show less"}
      </button>
    </p>
  );
}
