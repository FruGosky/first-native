import { env } from '@/env';
import { tablesTB } from '@/lib/appwrite';
import { CreateHabit, Habit } from '@/types/backend.types';
import { ID, Models } from 'react-native-appwrite';

export const createHabit = async (habit: CreateHabit) => {
  await tablesTB.createRow({
    databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
    tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
    rowId: ID.unique(),
    data: {
      ...habit,
      streakCount: 0,
      lastCompleted: null,
    } satisfies Omit<Habit, keyof Models.Row>,
  });
};
