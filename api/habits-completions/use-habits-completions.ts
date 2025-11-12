import { client } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { HabitCompletion } from '@/types/backend.types';
import { useCallback, useEffect, useState } from 'react';
import { HABITS_COMPLETION_CHANNEL } from '../channels';
import { CREATE_ROW_EVENT } from '../events';
import { fetchCompletions, fetchTodayCompletions } from './fetch-habits-completions';

const useHabitCompletionsBase = (
  fetcher: (userId: string) => Promise<HabitCompletion[] | undefined>,
  onDataChange: (completions: HabitCompletion[] | undefined) => void
) => {
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;

    const subscription = client.subscribe(HABITS_COMPLETION_CHANNEL, (response) => {
      if (!response.events.includes(CREATE_ROW_EVENT)) return;
      fetcher(user.$id).then(onDataChange);
    });

    fetcher(user.$id).then(onDataChange);

    return () => {
      subscription();
    };
  }, [user, onDataChange, fetcher]);
};

export const useHabitsCompletions = () => {
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const onDataChange = useCallback((habitCompletions?: HabitCompletion[]) => {
    if (!habitCompletions) return;
    setCompletions(habitCompletions);
  }, []);
  useHabitCompletionsBase(fetchCompletions, onDataChange);
  return completions;
};

export const useTodayHabitsCompletionsIds = () => {
  const [ids, setIds] = useState<Set<string>>(new Set());
  const onDataChange = useCallback((habitCompletions?: HabitCompletion[]) => {
    if (!habitCompletions) return;
    setIds(new Set(habitCompletions.map((completion) => completion.habitId)));
  }, []);
  useHabitCompletionsBase(fetchTodayCompletions, onDataChange);
  return ids;
};
