import { z } from 'zod';

export const comingSoonSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Please enter a valid email address' })
});

export type ComingSoonFormData = z.infer<typeof comingSoonSchema>;
