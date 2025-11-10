import { Frequency } from './backend-enums.types';

export type Habit = {
  $id: string;
  userId: string;
  title: string;
  description: string;
  streakCount: number;
  frequency: Frequency;
  lastCompleted: string; // Date
  $createdAt: string; // Date
  $updatedAt: string | null; // Date
};

export type CreateHabit = Omit<Habit, '$id' | '$createdAt' | '$updatedAt'>;
