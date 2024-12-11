import { Metadata } from 'next';
import { getUrlByTitle } from '@/lib/utils';
import MovieContainer from '@/components/MovieContainer';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export const runtime = 'edge';

export async function generateMetadata({
    searchParams,
}: {
    searchParams: SearchParams;
}): Promise<Metadata> {
    const params = await searchParams;
    const title = params['title'];

    return {
        title: `${title} | StreamTube`,
    };
}

export default async function ViewMorePage({
    searchParams,
}: {
    searchParams: SearchParams;
}) {
    const title = (await searchParams)['title'] as string;
    const url = getUrlByTitle(title);

    return (
        <section className="py-10">
            <h2 className="text-4xl font-bold px-10 mb-5">
                Results of {title}
            </h2>
            <MovieContainer
                url={url}
                title={title!}
                isVertical={true}
                showBtn={false}
            />
        </section>
    );
}
