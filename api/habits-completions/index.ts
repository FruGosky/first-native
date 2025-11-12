import { createHabitCompletion } from './create-habit-completions';
import { fetchTodayCompletions } from './fetch-habits-completions';
import { useHabitsCompletions } from './use-habits-completions';
import { useHabitsCompletionsIds } from './use-habits-completions-ids';

export const habitsCompletions = {
  get: fetchTodayCompletions,
  useGet: useHabitsCompletions,
  useGetIds: useHabitsCompletionsIds,
  create: createHabitCompletion,
};
