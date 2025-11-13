import { z } from 'zod';

export const authSchema = z.object({
  email: z.string().nonempty('Email is required').email('Invalid email address'),
  password: z.string().nonempty('Password is required').min(8, 'At least 8 characters'),
});
