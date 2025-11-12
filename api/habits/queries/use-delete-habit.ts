import { QUERY_KEYS } from '@/api/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteHabit } from '../fetch/delete-habit';

export const useDeleteHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: string) => await deleteHabit(habitId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habits });
    },
  });
};
