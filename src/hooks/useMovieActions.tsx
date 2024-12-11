import { useState, useEffect } from "react";
import { useFirebaseContext } from "@/contexts/FirebaseContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase.config";
import { likeUnlike, addToWatchList } from "@/lib/firebaseActions";
import { toast } from "sonner";
import { IMovieDetails } from "@/interfaces/movie";

export const useMovieActions = (movie?: IMovieDetails) => {
  const { user } = useFirebaseContext();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isInWatchList, setIsInWatchList] = useState<boolean>(false);

  useEffect(() => {
    if (!user || !user.email) return;

    const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
      const isLiked = !!doc
        .data()
        ?.liked.find((m: IMovieDetails) => m.id === movie?.id);

      const isInWatchList = doc
        .data()
        ?.watchList?.find((m: IMovieDetails) => m.id === movie?.id);

      if (isLiked) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }

      if (isInWatchList) {
        setIsInWatchList(true);
      } else {
        setIsInWatchList(false);
      }
    });

    return () => unsubscribe();
  }, [user, movie]);

  const handleLikeUnlike = async () => {
    if (!user?.email) return;

    const liked = await likeUnlike(user.email, movie);

    if (liked) {
      toast(`Successfully add ${movie?.title} to your liked list.`);
    } else {
      toast(`Successfully remove ${movie?.title} from your watch list.`);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!user?.email) return;

    const isAdded = await addToWatchList(user.email, movie);

    if (isAdded) {
      toast(`Successfully added ${movie?.title} to Watch List.`);
    } else {
      toast(`Successfully removed ${movie?.title} from Watch List.`);
    }
  };

  return { isLiked, isInWatchList, handleLikeUnlike, handleAddToWatchlist };
};
