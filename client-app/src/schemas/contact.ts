import { z } from 'zod';

export const createContactSchema = (t: (key: string) => string) => {
  return z.object({
    name: z.string().min(1, t('Contact.error.name')),
    email: z
      .string()
      .email(t('Contact.error.email'))
      .min(1, t('Contact.error.emailRequired')),
    message: z.string().min(1, t('Contact.error.message')),
    honepot: z.string().max(0, t('Contact.send.bot')).optional(),
  });
};
