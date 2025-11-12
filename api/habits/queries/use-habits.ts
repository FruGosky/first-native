import { QUERY_KEYS } from '@/api/query-keys';
import { useQuery } from '@tanstack/react-query';
import { fetchHabits } from '../fetch/fetch-habits';

export const useHabits = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.habits,
    queryFn: async () => await fetchHabits(userId),
    enabled: !!userId,
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    refetchInterval: 1000 * 30, // Refetch every 30 seconds
  });
};
