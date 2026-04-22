import React, { useState, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { createContactSchema } from '@/schemas/contact';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contact } from '@/interfaces/contact';
import { cn, getBgColor, getTextColor } from '@/utils/cn';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const formAnimations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  },
  nothing: {},
};

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');

  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();
  const contactSchema = createContactSchema(t);

  const defaultValues: Contact = {
    name: '',
    email: '',
    message: '',
    honeypot: '',
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const name = useWatch({ control, name: 'name' });
  const email = useWatch({ control, name: 'email' });
  const message = useWatch({ control, name: 'message' });

  const allFieldsFilled = useMemo(
    () => !!name?.trim() && !!email?.trim() && !!message?.trim(),
    [name, email, message],
  );

  const buttonClassName = useMemo(
    () =>
      cn(
        theme === 'dark'
          ? getBgColor(theme, 'search')
          : getBgColor(theme, 'comments'),
        getTextColor(theme, 'secondary'),
      ),
    [theme],
  );

  const hideStatus = () => setStatusVisible(false);

  const onSubmit = (data: Contact) => {
    if (errors.honeypot) {
      setStatus(errors.honeypot?.message || t('Contact.send.bot'));
      setStatusType('error');
      setStatusVisible(true);
      setTimeout(hideStatus, 10000);
      return;
    }

    const templateParams = {
      from_name: data.name,
      user_email: data.email,
      message: data.message,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID as string,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string,
      )
      .then((response) => {
        console.log(t('Contact.send.success'), response.status, response.text);
        setStatus(t('Contact.send.success'));
        setStatusType('success');
        setStatusVisible(true);
        setTimeout(hideStatus, 10000);
      })
      .catch((error) => {
        console.error(`${t('Contact.send.error')} :`, error);
        setStatus(t('Contact.send.error'));
        setStatusType('error');
        setStatusVisible(true);
        setTimeout(hideStatus, 10000);
      });

    setValue('name', '');
    setValue('email', '');
    setValue('message', '');
  };

  return (
    <div className={styles.contactForm}>
      <motion.form
        initial='hidden'
        animate='show'
        variants={formAnimations.container}
        onSubmit={handleSubmit(onSubmit)}
        id='contact-form'
        name='contact-form'
        className={cn(
          'w-full md:w-feed md:rounded-lg',
          getBgColor(theme, 'header'),
        )}
      >
        <motion.h1
          variants={formAnimations.item}
          className={getTextColor(theme, 'primary')}
        >
          {t('Contact.title.prefix')}
          <span>{t('Contact.title.emphasis')}</span> !
        </motion.h1>

        <motion.div variants={formAnimations.item}>
          <label
            className={getTextColor(theme, 'secondary')}
            htmlFor='name'
            data-testid='name-label'
          >
            {t('Contact.name')}:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            className={getTextColor(theme, 'primary')}
            type='text'
            maxLength={70}
            {...register('name')}
            id='name'
            autoComplete='name'
            data-testid='name-input'
          />
          {errors.name && <p className='error-text'>{errors.name.message}</p>}
        </motion.div>

        <motion.div variants={formAnimations.item}>
          <label
            className={getTextColor(theme, 'secondary')}
            htmlFor='email'
            data-testid='email-label'
          >
            {t('Contact.email')}:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            className={getTextColor(theme, 'primary')}
            maxLength={320}
            {...register('email')}
            id='email'
            autoComplete='email'
            data-testid='email-input'
          />
        </motion.div>
        {errors.email && <p className='error-text'>{errors.email.message}</p>}

        <motion.div variants={formAnimations.item}>
          <label
            className={getTextColor(theme, 'secondary')}
            htmlFor='message'
            data-testid='message-label'
          >
            {t('Contact.message')}:
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className={getTextColor(theme, 'primary')}
            maxLength={1200}
            {...register('message')}
            id='message'
            data-testid='message-textarea'
          />
          {errors.message && (
            <p className='error-text'>{errors.message.message}</p>
          )}
        </motion.div>

        {/* Honeypot */}
        <div style={{ display: 'none' }}>
          <label htmlFor='honey' data-testid='honey-label'>
            honey is yummy
          </label>
          <input
            type='text'
            {...register('honeypot')}
            id='honey'
            data-testid='honey-input'
          />
        </div>
        {/* Honeypot */}

        <motion.button
          variants={
            allFieldsFilled ? formAnimations.item : formAnimations.nothing
          }
          whileHover={{ scale: allFieldsFilled ? 1.02 : 1 }}
          whileTap={{ scale: allFieldsFilled ? 0.98 : 1 }}
          className={buttonClassName}
          type='submit'
          style={{
            backgroundColor: allFieldsFilled ? '#54c078' : '',
            color: allFieldsFilled
              ? theme === 'dark'
                ? 'black'
                : 'white'
              : '',
          }}
          data-testid='submit-button'
          disabled={!allFieldsFilled}
        >
          {t('Contact.send.title')}
        </motion.button>
      </motion.form>

      <AnimatePresence>
        {statusVisible && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`${styles.status} ${
              statusType === 'error' ? styles.errorStatus : ''
            }`}
          >
            {status}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
