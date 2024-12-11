import { Metadata } from 'next';
import { getNetworkMovies } from '@/lib/actions';
import MovieGrid from '@/components/MovieGrid';

type Params = Promise<{ networkId: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const runtime = 'edge';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: SearchParams;
}): Promise<Metadata> {
    const params = await searchParams;
    const title = params['name'];

    return {
        title: `${title} Movies | StreamTube`,
    };
}

export default async function NetworkPage({
    params,
    searchParams,
}: {
    params: Params;
    searchParams: SearchParams;
}) {
    const { networkId } = await params;
    const name = (await searchParams)['name'];
    const data = await getNetworkMovies(Number(networkId));

    return (
        <section className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                {name} Movies
            </h1>
            <MovieGrid movies={data?.results || []} />
        </section>
    );
}
