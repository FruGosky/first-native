import { env } from '@/env';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { tablesTB } from '@/lib/appwrite';
import { Habit } from '@/types/backend.types';
import { Query } from 'react-native-appwrite';

export const fetchHabits = async (userId: string) => {
  try {
    const response = await tablesTB.listRows<Habit>({
      databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
      tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
      queries: [Query.equal('userId' satisfies keyof Habit, userId)],
    });
    return response.rows;
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
  }
};
