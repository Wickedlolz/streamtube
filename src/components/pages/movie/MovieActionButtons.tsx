'use client';

import { useRouter } from 'next/navigation';
import { useMovieActions } from '@/hooks/useMovieActions';
import { useFirebaseContext } from '@/contexts/FirebaseContext';
import { IMovieDetails } from '@/interfaces/movie';

import { Button } from '@/components/ui/button';
import {
    CircleCheck,
    CirclePlus,
    Play,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react';
import { hasMovieBeenReleased } from '@/lib/utils';

type MovieActionButtonsProps = {
    movie: IMovieDetails | undefined;
};

const MovieActionButtons = ({ movie }: MovieActionButtonsProps) => {
    const { user } = useFirebaseContext();
    const { isLiked, isInWatchList, handleLikeUnlike, handleAddToWatchlist } =
        useMovieActions(movie);
    const navigate = useRouter();

    const handleWatchMovie = () => {
        navigate.push(
            `/player/${movie?.id}/${
                encodeURIComponent(
                    movie?.title.toLocaleLowerCase().split(' ').join('-') || ''
                ) ||
                encodeURIComponent(
                    movie?.original_title
                        .toLocaleLowerCase()
                        .split(' ')
                        .join('-') || ''
                )
            }`
        );
    };

    const isReleased = hasMovieBeenReleased(movie?.release_date);

    return (
        <div className="flex items-center gap-3">
            <Button
                variant="secondary"
                onClick={handleWatchMovie}
                disabled={!isReleased}
                className="cursor-pointer"
            >
                <Play className={isReleased ? 'animate-pulse' : ''} />
            </Button>

            {user ? (
                <>
                    {!isLiked ? (
                        <Button variant="secondary" onClick={handleLikeUnlike}>
                            <ThumbsUp />
                        </Button>
                    ) : (
                        <Button variant="secondary" onClick={handleLikeUnlike}>
                            <ThumbsDown />
                        </Button>
                    )}

                    {isInWatchList ? (
                        <Button
                            variant="secondary"
                            onClick={handleAddToWatchlist}
                        >
                            <CircleCheck />
                        </Button>
                    ) : (
                        <Button
                            variant="secondary"
                            onClick={handleAddToWatchlist}
                        >
                            <CirclePlus />
                        </Button>
                    )}
                </>
            ) : null}
        </div>
    );
};

export default MovieActionButtons;
