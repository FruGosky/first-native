import { FREQUENCIES } from '@/types/backend-enums.types';
import { z } from 'zod';

export const addHabitSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be under 100 characters'),
  description: z.string().min(1, 'Description is required').max(500, 'Description too long'),
  frequency: z.enum(FREQUENCIES),
});
