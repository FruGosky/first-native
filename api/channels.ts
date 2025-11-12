import { env } from '@/env';

export const HABITS_CHANNEL = `databases.${env.EXPO_PUBLIC_APPWRITE_DB_ID}.tables.${env.EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID}.rows`;
export const HABITS_COMPLETION_CHANNEL = `databases.${env.EXPO_PUBLIC_APPWRITE_DB_ID}.tables.${env.EXPO_PUBLIC_APPWRITE_HABITS_COMPLETIONS_TABLE_ID}.rows`;
