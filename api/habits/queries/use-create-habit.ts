import { QUERY_KEYS } from '@/api/query-keys';
import { CreateHabit } from '@/types/backend.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createHabit } from '../fetch/create-habit';

export const useCreateHabit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitData: CreateHabit) => await createHabit(habitData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.habits });
    },
  });
};
