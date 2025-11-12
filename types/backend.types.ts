import { Models } from 'react-native-appwrite';
import { Frequency } from './backend-enums.types';

export type Habit = Models.Row & {
  userId: string;
  title: string;
  description: string;
  streakCount: number;
  frequency: Frequency;
  lastCompleted: string | null; // Date
};
export type CreateHabit = Omit<Habit, keyof Models.Row | 'streakCount' | 'lastCompleted'>;

export type HabitCompletion = Models.Row & {
  habitId: string;
  userId: string;
};
export type CreateHabitCompletion = Omit<HabitCompletion, keyof Models.Row>;
