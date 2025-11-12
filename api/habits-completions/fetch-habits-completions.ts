import { env } from '@/env';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { tablesTB } from '@/lib/appwrite';
import { HabitCompletion } from '@/types/backend.types';
import { Query } from 'react-native-appwrite';

export const fetchTodayCompletions = async (userId: string) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const response = await tablesTB.listRows<HabitCompletion>({
      databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
      tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_COMPLETIONS_TABLE_ID,
      queries: [
        Query.equal('userId' satisfies keyof HabitCompletion, userId),
        Query.greaterThanEqual('$createdAt' satisfies keyof HabitCompletion, today.toISOString()),
      ],
    });
    return response.rows;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
  }
};
