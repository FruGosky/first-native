import { env } from '@/env';
import { getErrorMessage } from '@/helpers/getErrorMessage';
import { tablesTB } from '@/lib/appwrite';

export const deleteHabit = async (habitId: string) => {
  try {
    await tablesTB.deleteRow({
      databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
      tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
      rowId: habitId,
    });
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error(errorMessage);
  }
};
