import { z } from 'zod';

export const createUsersSchema = z.object({
  username: z.string().min(3, 'username is required').max(16),
  email: z.string().email('invalid format'),
  phone: z.string().min(6).max(16).optional(),
  password: z.string().min(6, 'password must be at least 6 characters').max(16),
  address: z.string().min(3, 'your address is required'),
  img: z.string().optional(),
  isAdmin: z.enum(['true', 'false']),
  isActive: z.enum(['true', 'false']),
});

export type CreateUsersSchemaType = z.infer<typeof createUsersSchema>;
