import { client } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { HabitCompletion } from '@/types/backend.types';
import { useEffect, useState } from 'react';
import { HABITS_COMPLETION_CHANNEL } from '../channels';
import { CREATE_ROW_EVENT } from '../events';
import { fetchTodayCompletions } from './fetch-habits-completions';

export const useHabitsCompletions = () => {
  const { user } = useAuth();
  const [todayCompletedHabitIds, setTodayCompletedHabitIds] = useState<HabitCompletion[]>([]);

  const assignTodayCompletions = (todayCompletions: HabitCompletion[] | undefined) => {
    if (!todayCompletions) return;
    setTodayCompletedHabitIds(todayCompletions);
  };

  useEffect(() => {
    if (!user) return;

    const habitsCompletionSubscription = client.subscribe(HABITS_COMPLETION_CHANNEL, (response) => {
      if (response.events.includes(CREATE_ROW_EVENT)) {
        fetchTodayCompletions(user.$id).then(assignTodayCompletions);
      }
    });

    fetchTodayCompletions(user.$id).then(assignTodayCompletions);

    return () => {
      habitsCompletionSubscription();
    };
  }, [user]);

  return todayCompletedHabitIds;
};
