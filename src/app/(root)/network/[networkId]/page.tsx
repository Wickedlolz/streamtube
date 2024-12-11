import MovieGrid from "@/components/MovieGrid";
import { getNetworkMovies } from "@/lib/actions";
import { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  const params = await searchParams;
  const title = params["name"];

  return {
    title: `${title} Movies | StreamTube`,
  };
}

export default async function NetworkPage({
  params,
  searchParams,
}: {
  params: { networkId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { networkId } = await params;
  const name = searchParams["name"];
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
