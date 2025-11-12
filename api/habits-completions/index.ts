import { createHabitCompletion } from './create-habit-completions';
import { fetchTodayCompletions } from './fetch-habits-completions';
import { useHabitsCompletions, useTodayHabitsCompletionsIds } from './use-habits-completions';

export const habitsCompletions = {
  get: fetchTodayCompletions,
  useGet: useHabitsCompletions,
  useGetIdsForToday: useTodayHabitsCompletionsIds,
  create: createHabitCompletion,
};
