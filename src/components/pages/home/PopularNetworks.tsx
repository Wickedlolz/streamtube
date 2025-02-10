"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getMovieProviders } from "@/lib/actions";
import { getImagePath } from "@/lib/getImagePath";

const PopularNetworks = () => {
  const navigate = useRouter();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["networkProviders"],
    queryFn: () => getMovieProviders(),
  });

  const handleNetworkClick = (providerId: number, providerName: string) => {
    navigate.push(
      `/network/${providerId}?name=${encodeURIComponent(
        providerName.replace("Movies", "")
      )}`
    );
  };

  if (isLoading) {
    return (
      <section className="bg-gradient h-44 w-full py-2 rounded-md flex gap-3 overflow-hidden">
        <div className="h-full flex flex-col justify-center w-32 pl-5">
          <p className="text-red-950 font-bold">Popular</p>
          <p className="text-xl text-white font-bold">NETWORKS</p>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50"></div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-gradient h-44 w-full py-2 rounded-md flex gap-3 overflow-hidden">
        <div className="h-full flex flex-col justify-center w-32 pl-5">
          <p className="text-red-950 font-bold">Popular</p>
          <p className="text-xl text-white font-bold">NETWORKS</p>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="dark:text-white font-bold text-center text-xl">
            Error loading networks. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  const networkProviders = data?.results.slice(0, 40);

  return (
    <section className="bg-gradient h-44 w-full py-2 rounded-xs flex">
      <div className="h-full flex flex-col justify-center w-32 pl-2 shrink-0 z-10">
        <p className="text-red-200 tracking-widest drop-shadow-xl font-bold">
          Popular
        </p>
        <p className="text-base text-white font-bold tracking-wider">
          NETWORKS
        </p>
      </div>
      <div className="relative text-white overflow-hidden grow">
        <div className="flex space-x-4 overflow-x-scroll px-5 lg:px-10 py-5 scrollbar-hide h-full">
          {networkProviders?.map((provider) => (
            <article
              key={provider.provider_id}
              onClick={() =>
                handleNetworkClick(provider.provider_id, provider.provider_name)
              }
              className="relative shrink-0 cursor-pointer transform hover:scale-105 transition duration-200 ease-out hover:drop-shadow-lg"
              aria-label={`View provider ${provider.provider_name}`}
            >
              <Image
                src={getImagePath(provider.logo_path)}
                alt={provider.provider_name}
                width={90}
                height={90}
                className="object-cover rounded-lg"
                loading="lazy"
              />
              <p className="text-center text-xs w-[85px] mt-1">
                {provider.provider_name}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularNetworks;
