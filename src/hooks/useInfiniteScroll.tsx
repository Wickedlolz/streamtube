import { QueryKey, useInfiniteQuery } from '@tanstack/react-query';
import { requester } from '@/lib/actions';
import { ISearchResults } from '@/interfaces/movie';

export const useInfiniteScroll = (
    url: URL,
    qKey: QueryKey,
    qValue: string | null | undefined
) => {
    const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
        useInfiniteQuery({
            queryKey: [qKey, qValue],
            queryFn: async ({ pageParam = 1 }) => {
                url.searchParams.set('page', pageParam.toString());
                return await requester<ISearchResults>(url.toString());
            },
            initialPageParam: 1,
            getNextPageParam: (lastPage, allPages) =>
                allPages.length < (lastPage.total_pages || 0)
                    ? allPages.length + 1
                    : undefined,
            enabled: !!qValue,
            refetchOnMount: true,
        });

    return { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage };
};
