import { z } from 'zod';

const schema = z.object({
  EXPO_PUBLIC_APPWRITE_API_ENDPOINT: z.string().url(),
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
  EXPO_PUBLIC_APPWRITE_PLATFORM: z.string(),
  EXPO_PUBLIC_APPWRITE_DB_ID: z.string(),
  EXPO_PUBLIC_APPWRITE_HABITS_TABLE_ID: z.string(),
  EXPO_PUBLIC_APPWRITE_HABITS_COMPLETIONS_TABLE_ID: z.string(),
});

const safeParseEnvObj = schema.safeParse(process.env);

if (!safeParseEnvObj.success) {
  console.error('❌ Invalid or missing environment variables:');
  safeParseEnvObj.error.issues.forEach((error) => {
    console.error(`- ${error.path.join('.')}: ${error.message}`);
  });
  throw new Error('Environment variables validation failed');
} else {
  console.info('✅ All environment variables are valid.');
}

export const env = safeParseEnvObj.data;
