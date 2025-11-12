import { Habit } from '@/types/backend.types';
import { createHabitCompletion } from '../habits-completions/create-habit-completions';
import { updateHabit } from './update-habit';

export const completeHabit = async (userId: string, habit: Habit) => {
  await createHabitCompletion(userId, habit.$id);

  const updatedHabit: Habit = {
    ...habit,
    streakCount: habit.streakCount + 1,
    lastCompleted: new Date().toISOString(),
  };

  await updateHabit(updatedHabit);
};
