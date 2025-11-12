import { useHabitsCompletions } from './use-habits-completions';

export const useHabitsCompletionsIds = () => {
  const completions = useHabitsCompletions();
  return new Set(completions.map((completion) => completion.habitId));
};
