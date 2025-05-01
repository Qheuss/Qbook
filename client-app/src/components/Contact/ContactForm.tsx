import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { createContactSchema } from '@/schemas/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Contact } from '@/interfaces/contact';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

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
    watch,
    formState: { errors },
  } = useForm<Contact>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    mode: 'onSubmit',
  });

  const watchedFields = watch(['name', 'email', 'message']);
  const allFieldsFilled = watchedFields.every((field) => field !== '');

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

  const onSubmit = (data: Contact) => {
    if (errors.honeypot) {
      setStatus(errors.honeypot?.message || t('Contact.send.bot'));
      setStatusType('error');
      setStatusVisible(true);
      setTimeout(() => setStatusVisible(false), 10000);
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
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string
      )
      .then((response) => {
        console.log(t('Contact.send.success'), response.status, response.text);
        setStatus(t('Contact.send.success'));
        setStatusType('success');
        setStatusVisible(true);
        setTimeout(() => setStatusVisible(false), 10000);
      })
      .catch((error) => {
        console.error(`${t('Contact.send.error')} :`, error);
        setStatus(t('Contact.send.error'));
        setStatusType('error');
        setStatusVisible(true);
        setTimeout(() => setStatusVisible(false), 10000);
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
        className={
          'w-[100%] md:w-[680px] md:rounded-lg' +
          (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
        }
      >
        <motion.h1
          variants={formAnimations.item}
          className={theme === 'dark' ? ' text-fontDark' : ' text-fontLight'}
        >
          {t('Contact.title.prefix')}
          <span>{t('Contact.title.emphasis')}</span> !
        </motion.h1>

        <motion.div variants={formAnimations.item}>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='name'
            data-test='name-label'
          >
            {t('Contact.name')}:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            className={theme === 'dark' ? ' text-fontDark' : ' text-fontLight'}
            type='text'
            maxLength={70}
            {...register('name')}
            id='name'
            autoComplete='name'
            data-test='name-input'
          />
          {errors.name && <p className='error-text'>{errors.name.message}</p>}
        </motion.div>

        <motion.div variants={formAnimations.item}>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='email'
            data-test='email-label'
          >
            {t('Contact.email')}:
          </label>
          <motion.input
            whileFocus={{ scale: 1.01 }}
            className={theme === 'dark' ? ' text-fontDark' : ' text-fontLight'}
            maxLength={320}
            {...register('email')}
            id='email'
            autoComplete='email'
            data-test='email-input'
          />
        </motion.div>
        {errors.email && <p className='error-text'>{errors.email.message}</p>}

        <motion.div variants={formAnimations.item}>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='message'
            data-test='message-label'
          >
            {t('Contact.message')}:
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.01 }}
            className={theme === 'dark' ? ' text-fontDark' : ' text-fontLight'}
            maxLength={1201}
            {...register('message')}
            id='message'
            data-test='message-textarea'
          />
          {errors.message && (
            <p className='error-text'>{errors.message.message}</p>
          )}
        </motion.div>

        {/* Honeypot */}
        <div style={{ display: 'none' }}>
          <label htmlFor='honey' data-test='honey-label'>
            honey is yummy
          </label>
          <input
            type='text'
            {...register('honeypot')}
            id='honey'
            data-test='honey-input'
          />
        </div>
        {/* Honeypot */}

        <motion.button
          variants={
            allFieldsFilled ? formAnimations.item : formAnimations.nothing
          }
          whileHover={{ scale: allFieldsFilled ? 1.02 : 1 }}
          whileTap={{ scale: allFieldsFilled ? 0.98 : 1 }}
          className={
            theme === 'dark'
              ? ' bg-searchDark text-fontDarker'
              : ' bg-commentsLight text-fontLighter'
          }
          type='submit'
          style={{
            backgroundColor: allFieldsFilled ? '#54c078' : '',

            color: allFieldsFilled
              ? theme === 'dark'
                ? 'black'
                : 'white'
              : '',
          }}
          data-test='submit-button'
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
