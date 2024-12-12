import { Metadata } from 'next';
import { getMovieDetails } from '@/lib/actions';
import { getSmashystreamUrl } from '@/lib/utils';

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
        title: `${data.title || data.original_title} | StreamTube`,
    };
}

export default async function PlayerPage({ params }: { params: Params }) {
    const { movieId } = await params;

    return (
        <section className="relative w-full h-[80vh] md:min-h-dvh overflow-hidden">
            <PlayerBackButton />

            <div className="relative flex-grow">
                <iframe
                    allowFullScreen
                    className="w-full h-[80vh] md:h-[90vh] lg:h-[100vh]"
                    src={getSmashystreamUrl(movieId)}
                    loading="lazy"
                    title="Movie Player"
                ></iframe>
            </div>
        </section>
    );
}
