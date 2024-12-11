import { Metadata } from "next";
import { endpoints } from "@/lib/endpoints";

import HeroCarousel from "@/components/HeroCarousel";
import Highlights from "@/components/Highlights";
import MovieContainer from "@/components/MovieContainer";
import PopularNetworks from "@/components/PopularNetworks";

export const metadata: Metadata = {
  title: "Home | StreamTube",
};

export default function Home() {
  return (
    <section>
      <HeroCarousel />
      <section className="flex flex-col space-y-2">
        <Highlights />
        <MovieContainer url={endpoints.nowPlaying} title="Now Playing" />
        <PopularNetworks />
        <MovieContainer url={endpoints.upcoming} title="Upcoming" />
        <MovieContainer url={endpoints.topRated} title="Top Rated" />
        <MovieContainer url={endpoints.popular} title="Popular" />
      </section>
    </section>
  );
}
