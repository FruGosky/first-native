import { Account, Client } from 'react-native-appwrite';
import { env } from '@/env';

export const client = new Client()
  .setEndpoint(env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT)
  .setProject(env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)
  .setPlatform(env.EXPO_PUBLIC_APPWRITE_PLATFORM);

export const account = new Account(client);
