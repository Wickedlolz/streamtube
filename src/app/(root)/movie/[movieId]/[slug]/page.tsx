import { Metadata } from 'next';
import Image from 'next/image';
import { getMovieDetails } from '@/lib/actions';
import { convertRuntime, setBackgroundStylesWithImage } from '@/lib/utils';
import { endpoints } from '@/lib/endpoints';
import { getImagePath } from '@/lib/getImagePath';

import MovieContainer from '@/components/MovieContainer';
import GenresList from '@/components/GenresList';
import MovieActionButtons from '@/components/MovieActionButtons';
import Casts from '@/components/Casts';
import YoutubeVideos from '@/components/YouTubeVideos';
import MovieOverview from '@/components/MovieOverview';

type Params = Promise<{ movieId: string; slug: string }>;

export const runtime = 'edge';

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { movieId } = await params;
    const data = await getMovieDetails(movieId);

    return {
        title: `${data.title || data.original_title} | StreamTube`,
    };
}

export default async function MoviePage({ params }: { params: Params }) {
    const { movieId } = await params;
    const data = await getMovieDetails(movieId);

    return (
        <section>
            <section>
                <section
                    className="w-full h-full"
                    style={setBackgroundStylesWithImage(data?.backdrop_path)}
                >
                    <article className="max-w-[1140px] mx-auto md:px-8 sm:px-6 px-4 xl:px-0 lg:py-36 sm:py-[136px] sm:pb-28 xs:py-28 xs:pb-12 pt-24 pb-8 flex flex-row lg:gap-12 md:gap-10 gap-8 justify-center">
                        <div className="md:block hidden">
                            <div className="h-[380px] w-[254px]">
                                <Image
                                    width={254}
                                    height={380}
                                    src={getImagePath(data?.poster_path)}
                                    alt={data?.original_title}
                                    className="w-full h-full object-cover rounded-xl shadow-lg"
                                />
                            </div>
                        </div>
                        <div className="text-gray-300 sm:max-w-[80vw] max-w-[90vw] md:max-w-[520px] flex flex-col lg:gap-5 sm:gap-4 xs:gap-[14px] gap-3 mb-8 flex-1">
                            <h2 className="sm:text-4xl xs:text-3xl text-[28.75px] font-extrabold sm:leading-[1.2] xs:leading-normal leading-snug text-secColor sm:max-w-[420px] xs:max-w-[320px] max-w-[280px] md:max-w-[420px]">
                                {data?.title || data?.original_title}
                            </h2>

                            <GenresList genres={data?.genres} />

                            <div className="flex items-center gap-1 text-xs">
                                <p>
                                    {data?.release_date} (
                                    {data?.origin_country[0]})
                                </p>
                                <span>•</span>
                                <p>{convertRuntime(data!.runtime)}</p>
                            </div>

                            <MovieActionButtons movie={data} />

                            <p className="text-slate-400 italic font-bold text-lg">
                                {data?.tagline}
                            </p>

                            <MovieOverview movie={data} />

                            <Casts casts={data?.credits?.cast || []} />
                        </div>
                    </article>
                </section>
                <section className="px-10 mt-4">
                    <YoutubeVideos videos={data!.videos!.results} />
                </section>
            </section>
            <section className="pt-6 dark:bg-black">
                <MovieContainer
                    url={endpoints.similarMovies(movieId)}
                    title="Similar Movies"
                    isVertical
                    showBtn={false}
                />
            </section>
        </section>
    );
}
