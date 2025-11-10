import { env } from '@/env';
import { Account, Client, TablesDB } from 'react-native-appwrite';

export const client = new Client()
  .setEndpoint(env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT)
  .setProject(env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(env.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);
export const tablesTB = new TablesDB(client);
