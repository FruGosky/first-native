import { client } from '@/lib/appwrite';
import { useAuth } from '@/lib/auth-context';
import { Habit } from '@/types/backend.types';
import { useEffect, useState } from 'react';
import { HABITS_CHANNEL } from '../channels';
import { CREATE_ROW_EVENT, DELETE_ROW_EVENT, UPDATE_ROW_EVENT } from '../events';
import { fetchHabits } from './fetch-habits';

export const useHabits = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);

  const assignHabits = (habits: Habit[] | undefined) => {
    if (!habits) return;
    setHabits(habits);
  };

  useEffect(() => {
    if (!user) return;

    const habitsSubscription = client.subscribe(HABITS_CHANNEL, (response) => {
      if (
        response.events.includes(CREATE_ROW_EVENT) ||
        response.events.includes(UPDATE_ROW_EVENT) ||
        response.events.includes(DELETE_ROW_EVENT)
      ) {
        fetchHabits(user.$id).then(assignHabits);
      }
    });

    fetchHabits(user.$id).then(assignHabits);

    return () => {
      habitsSubscription();
    };
  }, [user]);

  return habits;
};
