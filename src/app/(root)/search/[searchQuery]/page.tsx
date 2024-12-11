import { Metadata } from 'next';
import SearchMoviesWithInfinityScroll from '@/components/SearchMoviesWithInfinityScroll';

type Params = Promise<{ searchQuery: string }>;

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { searchQuery } = await params;

    return {
        title: `${decodeURIComponent(searchQuery)} | StreamTube`,
    };
}

export default async function SearchPage({ params }: { params: Params }) {
    const { searchQuery } = await params;

    return (
        <section className="py-10 max-w-screen-xl mx-auto">
            <h2 className="text-4xl font-bold px-10 mb-5 dark:text-white">
                Results for {decodeURIComponent(searchQuery)}
            </h2>
            <div className="relative">
                <SearchMoviesWithInfinityScroll searchQuery={searchQuery} />
            </div>
        </section>
    );
}
