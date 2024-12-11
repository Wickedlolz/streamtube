import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { requester } from "@/lib/utils";
import { ISearchResults } from "@/interfaces/movie";

export const useInfiniteScroll = (
  url: URL,
  qKey: string,
  qValue: string | null | undefined
) => {
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setPage(1); // Reset page to 1 on search query change
  }, [qValue]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [qKey, qValue],
      queryFn: ({ pageParam = page }) => handleNextPage(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.total_pages && allPages.length < lastPage.total_pages
          ? allPages.length + 1
          : undefined;
      },
      enabled: !!qValue,
      refetchOnMount: true,
    });

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, hasNextPage]);

  const handleNextPage = async (lastPage: number) => {
    setPage(lastPage);
    url.searchParams.set("page", lastPage.toString());
    return await requester<ISearchResults>(url);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1200 &&
      !isFetchingNextPage &&
      hasNextPage
    ) {
      fetchNextPage();
    }
  };

  return { data, isLoading, isFetchingNextPage };
};
