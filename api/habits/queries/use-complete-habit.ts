import { QUERY_KEYS } from '@/api/query-keys';
import { Habit } from '@/types/backend.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeHabit } from '../fetch/complete-habit';

export const useCompleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, habit }: { userId: string; habit: Habit }) =>
      await completeHabit(userId, habit),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habits });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.completions });
    },
  });
};
