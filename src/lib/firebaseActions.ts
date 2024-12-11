import { db } from "./firebase.config";
import { User } from "firebase/auth";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { requester } from "./utils";
import { endpoints } from "./endpoints";
import { IMovie, IMovieDetails, ISearchResults } from "@/interfaces/movie";

export const getPersonalizedMovies = async (userProfile: User) => {
  if (!userProfile) return [];

  const user = await getDoc(doc(db, "users", userProfile.email!));
  const genreIds: string = user.data()?.favoriteGenres.join(",");
  const url = new URL(endpoints.discoverMovies);
  url.searchParams.set("with_genres", genreIds);

  if (genreIds.length === 0) return [];

  const data = await requester<ISearchResults>(url);

  // Exclude already liked or watched movies
  const recommendedMovies = data.results.filter(
    (movie) =>
      !user.data()?.liked.find((m: IMovie) => movie.id === m.id) &&
      !user.data()?.watchList.find((m: IMovie) => movie.id === m.id)
  );

  return recommendedMovies;
};

export const addToWatchList = async (
  userEmail: string,
  movie?: IMovieDetails
) => {
  if (!movie) return;

  const user = await getDoc(doc(db, "users", userEmail));
  const userData = user.data();

  if (!userData) return;

  const isAdded = userData?.watchList?.find(
    (m: IMovieDetails) => m.id === movie?.id
  );

  if (isAdded) {
    const updatedList = user
      .data()
      ?.watchList?.filter((m: IMovieDetails) => m.id !== movie?.id);

    // Check which genres need to be removed from favoriteGenres
    const remainingGenres = userData.favoriteGenres.filter((genre: string) => {
      // Check if any other liked movie still has this genre
      return updatedList.some((m: IMovieDetails) =>
        m.genres.some((g) => g.name === genre)
      );
    });

    await updateDoc(doc(db, "users", userEmail), {
      watchList: updatedList,
      favoriteGenres: remainingGenres,
    });

    return false;
  } else {
    const genres = movie.genres.map((m) => m.id);
    await updateDoc(doc(db, "users", userEmail), {
      watchList: arrayUnion(movie),
      favoriteGenres: arrayUnion(...genres),
    });

    return true;
  }
};

export const likeUnlike = async (userEmail: string, movie?: IMovieDetails) => {
  if (!movie) return;

  const user = await getDoc(doc(db, "users", userEmail));
  const userData = user.data();

  if (!userData) return;

  const isLiked = userData.liked?.find(
    (m: IMovieDetails) => m.id === movie?.id
  );

  if (isLiked) {
    const updatedList = user
      .data()
      ?.liked.filter((m: IMovieDetails) => m.id !== movie.id);

    // Check which genres need to be removed from favoriteGenres
    const remainingGenres = userData.favoriteGenres.filter((genre: string) => {
      // Check if any other liked movie still has this genre
      return updatedList.some((m: IMovieDetails) =>
        m.genres.some((g) => g.name === genre)
      );
    });

    await updateDoc(doc(db, "users", userEmail), {
      liked: updatedList,
      favoriteGenres: remainingGenres,
    });

    return false;
  } else {
    const genres = movie.genres.map((m) => m.id);
    await updateDoc(doc(db, "users", userEmail), {
      liked: arrayUnion(movie),
      favoriteGenres: arrayUnion(...genres),
    });

    return true;
  }
};
