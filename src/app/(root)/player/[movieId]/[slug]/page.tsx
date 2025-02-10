import { Metadata } from 'next';
import Image from 'next/image';
import { getMovieDetails } from '@/lib/actions';
import { getSmashystreamUrl, formatDate, convertRuntime } from '@/lib/utils';
import { getImagePath } from '@/lib/getImagePath';

import PlayerBackButton from '@/components/PlayerBackButton';

type Params = Promise<{ movieId: string; slug: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { movieId } = await params;
    const data = await getMovieDetails(movieId);

    return {
        title: `Watch ${data.title || data.original_title} | StreamTube`,
        description: data.overview,
    };
}

export default async function PlayerPage({ params }: { params: Params }) {
    const { movieId } = await params;
    const movie = await getMovieDetails(movieId);

    return (
        <section className="relative w-full h-[calc(100dvh-80px)] bg-background">
            <PlayerBackButton />

            <div className="flex flex-col lg:flex-row w-full h-full">
                {/* Player Section */}
                <section className="w-full lg:w-[65%] h-[40vh] lg:h-full">
                    <iframe
                        allowFullScreen
                        className="w-full h-full"
                        src={getSmashystreamUrl(movieId)}
                        loading="lazy"
                        title={`Watch ${movie.title}`}
                    ></iframe>
                </section>

                {/* Movie Info Section */}
                <article className="w-full lg:w-[35%] p-6 space-y-6 overflow-y-auto max-h-[60vh] lg:max-h-dvh">
                    <div className="relative w-full aspect-2/3 max-w-[300px] mx-auto">
                        <Image
                            src={getImagePath(movie.poster_path)}
                            alt={movie.title}
                            fill
                            className="rounded-lg object-cover"
                            priority
                        />
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold">
                            {movie.title || movie.original_title}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{formatDate(movie.release_date)}</span>
                            <span>•</span>
                            <span>{convertRuntime(movie.runtime)}</span>
                            <span>•</span>
                            <span>{movie.vote_average.toFixed(1)} ⭐</span>
                        </div>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {movie.overview}
                        </p>

                        <div className="space-y-2">
                            <h2 className="font-semibold">Genres</h2>
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="shadow-[inset_0_0_0_1px_#fff] md:text-[12.75px] sm:text-[12px] xs:text-[11.75px] text-[10.75px]  sm:py-1 py-[2.75px] sm:px-3 px-[10px] rounded-full dark:text-gray-300"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {movie.production_companies.length > 0 && (
                            <div className="space-y-2">
                                <h2 className="font-semibold">Production</h2>
                                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                    {movie.production_companies.map(
                                        (company, index) => (
                                            <span key={company.id}>
                                                {company.name}
                                                {index !==
                                                    movie.production_companies
                                                        .length -
                                                        1 && ', '}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </section>
    );
}
