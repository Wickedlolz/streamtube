"use server";

import { endpoints } from "./endpoints";
import { db } from "./firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { IGenresResponse } from "@/interfaces/genres";
import {
  IMovieDetails,
  IMovieProviders,
  ISearchResults,
  IVideoResult,
} from "@/interfaces/movie";
import { IPerson } from "@/interfaces/people";

const baseUrl = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export async function requester<T>(urlString: string) {
  const url = new URL(urlString);

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

export const getNowPlayingMovies = async () => {
  const url = endpoints.nowPlaying;
  const data = await requester<ISearchResults>(url);
  return data.results;
};

export const getUpcomingMovies = async () => {
  const url = endpoints.upcoming;
  const data = await requester<ISearchResults>(url);
  return data.results;
};

export const getTopRatedMovies = async () => {
  const url = endpoints.topRated;
  const data = await requester<ISearchResults>(url);
  return data.results;
};

export const getPopularMovies = async () => {
  const url = endpoints.popular;
  const data = await requester<ISearchResults>(url);
  return data.results;
};

export const getDiscoverMovies = async (id?: string, keywords?: string) => {
  const url = new URL(endpoints.discoverMovies);

  if (keywords) {
    url.searchParams.set("with_keywords", keywords);
  }

  if (id) {
    url.searchParams.set("with_genres", id);
  }

  const data = await requester<ISearchResults>(url.toString());
  return data.results;
};

export const getSearchedMovies = async (term: string) => {
  const url = new URL(endpoints.searchMovie);
  url.searchParams.set("query", term);

  const data = await requester<ISearchResults>(url.toString());
  return data.results;
};

export const getMovieVideos = async (id: string) => {
  const url = endpoints.movieVideosById(id);

  const data = await requester<IVideoResult>(url);
  return data.results;
};

export const getMovieDetails = async (id: string) => {
  const url = endpoints.movieDetailsById(id);

  const data = await requester<IMovieDetails>(url);
  return data;
};

export const getFullMovieDetails = async (movieId: string) => {
  const movieDetails = await getMovieDetails(movieId);
  const movieVideos = await getMovieVideos(movieId);

  const videos = movieVideos.slice(0, 5);

  return { details: movieDetails, videos };
};

export const getMovieWatchProvidersById = async (movieId: string) => {
  const url = endpoints.movieWatchProvidersById(movieId);
  const data = await requester(url);

  return data;
};

export const getMovieProviders = async () => {
  const url = endpoints.movieProviders;
  const data = await requester<IMovieProviders>(url);

  return data;
};

export const getPersonById = async (personId: string) => {
  const url = endpoints.getPersonById(personId);
  const data = await requester<IPerson>(url);

  return data;
};

export const getNetworkMovies = async (networkId: number) => {
  const url = new URL(`${baseUrl}/discover/movie`);
  url.searchParams.append("with_networks", networkId.toString());

  const response = await requester<ISearchResults>(url.toString());

  return response;
};

export const loadGenres = async () => {
  const url = endpoints.getMovieGenres();

  const response = await requester<IGenresResponse>(url);

  return response;
};

export const getUserCollections = async (userEmail: string) => {
  const user = await getDoc(doc(db, "users", userEmail));

  const likedMovies: IMovieDetails[] = user.data()?.liked;
  const watchList: IMovieDetails[] = user.data()?.watchList;

  return { likedMovies, watchList };
};

type SendEmailDto = {
  name: string;
  email: string;
  message: string;
};

type IResponseData = {
  message?: string;
  error?: string;
};

export const sendEmail = async (emailDto: SendEmailDto) => {
  const response = await fetch(
    "https://movie-studio-api.onrender.com/send-email",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailDto),
    }
  );

  const data = (await response.json()) as IResponseData;

  return data;
};
