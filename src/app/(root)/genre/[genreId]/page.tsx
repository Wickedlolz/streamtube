import { Metadata } from 'next';
import GenreMoviesWithInfinityScroll from '@/components/GenreMoviesWithInfinityScroll';

type Params = Promise<{ genreId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const runtime = 'edge';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: SearchParams;
}): Promise<Metadata> {
    const searchQuery = await searchParams;
    const title = searchQuery['genre'];

    return {
        title: `${title} | StreamTube`,
    };
}

export default async function GenrePage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const { genreId } = await params;
    const genre = (await searchParams)['genre'];

    return (
        <section className="py-10 max-w-screen-xl mx-auto">
            <h2 className="text-4xl font-bold px-10 mb-5 dark:text-white">
                Results for {genre}
            </h2>
            <div className="mx-10 py-2 flex items-center justify-between border-b border-b-gray-500 relative mb-4">
                <h2 className="text-sm uppercase font-bold tracking-wider dark:text-white">
                    {`Genre: ${genre}`}
                </h2>

                <span className="w-16 h-1 bg-red-600 inline-block absolute left-0 -bottom-[1.5px] z-10" />
            </div>
            <div className="relative">
                <GenreMoviesWithInfinityScroll
                    genre={genre as string}
                    genreId={genreId}
                />
            </div>
        </section>
    );
}
