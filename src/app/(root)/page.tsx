import { Metadata } from 'next';
import { endpoints } from '@/lib/endpoints';

import HeroCarousel from '@/components/pages/home/HeroCarousel';
import Highlights from '@/components/pages/home/Highlights';
import MovieContainer from '@/components/MovieContainer';
import PopularNetworks from '@/components/pages/home/PopularNetworks';
import Welcome from '@/components/pages/home/Welcome';

export const metadata: Metadata = {
    title: 'Home | StreamTube',
};

export default function Home() {
    return (
        <section>
            <HeroCarousel />
            <Welcome />
            <section className="flex flex-col space-y-2">
                <Highlights />
                <MovieContainer
                    url={endpoints.nowPlaying}
                    title="Now Playing"
                />
                <PopularNetworks />
                <MovieContainer url={endpoints.upcoming} title="Upcoming" />
                <MovieContainer url={endpoints.topRated} title="Top Rated" />
                <MovieContainer url={endpoints.popular} title="Popular" />
            </section>
        </section>
    );
}
