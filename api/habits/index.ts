import { useCompleteHabit } from './queries/use-complete-habit';
import { useCreateHabit } from './queries/use-create-habit';
import { useDeleteHabit } from './queries/use-delete-habit';
import { useHabits } from './queries/use-habits';

export const habits = {
  useGet: useHabits,
  useCreate: useCreateHabit,
  useComplete: useCompleteHabit,
  useDelete: useDeleteHabit,
};
