import { useHabitsCompletions } from './queries/use-habits-completions';
import { useTodayHabitsCompletionsIds } from './queries/use-habits-completions-ids';

export const habitsCompletions = {
  useGet: useHabitsCompletions,
  useGetIdsForToday: useTodayHabitsCompletionsIds,
};
