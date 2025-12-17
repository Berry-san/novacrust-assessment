import { z } from 'zod';

export const conversionSchema = z.object({
  payAmount: z.number().positive('Amount must be greater than 0'),
  payCurrency: z.string().min(1, 'Please select a currency'),
  receiveAmount: z.number().positive('Amount must be greater than 0'),
  receiveCurrency: z.string().min(1, 'Please select a currency'),
  payFrom: z.string().min(1, 'Please select a wallet'),
  payTo: z.string().min(1, 'Please select a payment method')
});

export type ConversionFormData = z.infer<typeof conversionSchema>;
