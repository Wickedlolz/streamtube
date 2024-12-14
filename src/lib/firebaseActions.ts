import { db } from './firebase.config';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { IMovieDetails } from '@/interfaces/movie';

export const addToWatchList = async (
    userEmail: string,
    movie?: IMovieDetails
) => {
    if (!movie) return;

    const user = await getDoc(doc(db, 'users', userEmail));
    const userData = user.data();

    if (!userData) return;

    const isAdded = userData?.watchList?.find(
        (m: IMovieDetails) => m.id === movie?.id
    );

    if (isAdded) {
        const updatedList = user
            .data()
            ?.watchList?.filter((m: IMovieDetails) => m.id !== movie?.id);

        await updateDoc(doc(db, 'users', userEmail), {
            watchList: updatedList,
        });

        return false;
    } else {
        await updateDoc(doc(db, 'users', userEmail), {
            watchList: arrayUnion(movie),
        });

        return true;
    }
};

export const likeUnlike = async (userEmail: string, movie?: IMovieDetails) => {
    if (!movie) return;

    const user = await getDoc(doc(db, 'users', userEmail));
    const userData = user.data();

    if (!userData) return;

    const isLiked = userData.liked?.find(
        (m: IMovieDetails) => m.id === movie?.id
    );

    if (isLiked) {
        const updatedList = user
            .data()
            ?.liked.filter((m: IMovieDetails) => m.id !== movie.id);

        await updateDoc(doc(db, 'users', userEmail), {
            liked: updatedList,
        });

        return false;
    } else {
        await updateDoc(doc(db, 'users', userEmail), {
            liked: arrayUnion(movie),
        });

        return true;
    }
};
