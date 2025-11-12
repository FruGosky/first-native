import { env } from '@/env';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { tablesTB } from '@/lib/appwrite';
import { Habit } from '@/types/backend.types';

export const updateHabit = async (updatedHabit: Habit) => {
  try {
    await tablesTB.updateRow({
      databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
      tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
      rowId: updatedHabit.$id,
      data: updatedHabit,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
  }
};
