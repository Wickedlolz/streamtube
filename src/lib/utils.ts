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
        : "https://i.ibb.co/vVvBpzZ/360-F-482375378-9q1-OVUTCIKY029-UGNh-W0vb-OG6b-Nu-K3-SX.jpg"
    }`,
    backgroundPosition: "top",
    backgroundSize: "cover",
  };
};

export const convertRuntime = (minutes: number) => {
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

export async function requester<T>(url: URL) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");

  if (!url.searchParams.get("page")) {
    url.searchParams.set("page", "1");
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_READ_ACCESS_TOKEN}`,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = await response.json();

  return data as T;
}
