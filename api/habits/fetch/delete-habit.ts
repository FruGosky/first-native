import { env } from '@/env';
import { tablesTB } from '@/lib/appwrite';

export const deleteHabit = async (habitId: string) => {
  await tablesTB.deleteRow({
    databaseId: env.EXPO_PUBLIC_APPWRITE_DB_ID,
    tableId: env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID,
    rowId: habitId,
  });
};
