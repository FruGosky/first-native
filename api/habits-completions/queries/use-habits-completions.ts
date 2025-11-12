import { QUERY_KEYS } from '@/api/query-keys';
import { useQuery } from '@tanstack/react-query';
import { fetchCompletions } from '../fetch/fetch-habits-completions';

export const useHabitsCompletions = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.completions,
    queryFn: async () => await fetchCompletions(userId),
    enabled: !!userId,
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });
};
