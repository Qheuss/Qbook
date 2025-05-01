import { z } from 'zod';

export const createContactSchema = (t: (key: string) => string) => {
  return z.object({
    name: z
      .string()
      .min(1, t('Contact.error.name'))
      .max(70, t('Contact.error.nameMax')),
    email: z
      .string()
      .email(t('Contact.error.email'))
      .min(1, t('Contact.error.emailRequired'))
      .max(320, t('Contact.error.emailMax')),
    message: z
      .string()
      .min(1, t('Contact.error.message'))
      .max(1200, t('Contact.error.messageMax')),
    honepot: z.string().max(0, t('Contact.send.bot')).optional(),
  });
};
