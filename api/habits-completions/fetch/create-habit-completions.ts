import { env } from '@/env';
import { tablesTB } from '@/lib/appwrite';
import { CreateHabitCompletion } from '@/types/backend.types';
import { ID } from 'react-native-appwrite';

export const createHabitCompletion = async (userId: string, habitId: string) => {
  await tablesTB.createRow({
    databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
    tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_COMPLETIONS_TABLE_ID,
    rowId: ID.unique(),
    data: {
      habitId,
      userId,
    } satisfies CreateHabitCompletion,
  });
};
