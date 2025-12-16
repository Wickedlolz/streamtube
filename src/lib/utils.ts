import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { endpoints } from "./endpoints";

const smashystreamUrl = process.env.NEXT_PUBLIC_SMASHSYTREAM_URL;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setBackgroundStylesWithImage = (imageUrl?: string) => {
  return {
    backgroundImage: `linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.98),rgba(0,0,0,0.8) ,rgba(0,0,0,0.4)),url(${
      imageUrl
        ? `https://image.tmdb.org/t/p/original/${imageUrl}`
        : "/fallback-image.jpg"
    }`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };
};

export const convertRuntime = (minutes?: number) => {
  if (!minutes || minutes <= 0) return "N/A";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const hasMovieBeenReleased = (release_date?: string) => {
  if (!release_date) return false;

  const today = new Date();
  const releaseDate = new Date(release_date);

  // Set both dates to midnight for an accurate comparison
  today.setHours(0, 0, 0, 0);
  releaseDate.setHours(0, 0, 0, 0);

  // Check if the movie's release date is today or in the past
  return releaseDate.getTime() < today.getTime();
};

export const getSmashystreamUrl = (movieId?: string) => {
  return `${smashystreamUrl}${movieId}`;
};

export const getUrlByTitle = (title: string) => {
  switch (title) {
    case "Now Playing":
      return endpoints.nowPlaying;

    case "Upcoming":
      return endpoints.upcoming;

    case "Top Rated":
      return endpoints.topRated;

    case "Popular Movies":
    case "Popular":
      return endpoints.popular;

    default:
      return "";
  }
};

export const formatDate = (date?: string) => {
  if (!date) return "N/A";
  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return "Invalid Date";
  }
};
