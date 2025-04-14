import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [statusVisible, setStatusVisible] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

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
  };

  useEffect(() => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name && emailRegex.test(email) && message) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [name, email, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setStatus(t('Contact.send.bot'));
      setStatusVisible(true);
      setTimeout(() => setStatusVisible(false), 10000);
      return;
    }

    const templateParams = {
      from_name: name,
      user_email: email,
      message: message,
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
        setStatusVisible(true);
        setTimeout(() => setStatusVisible(false), 10000);
      })
      .catch((error) => {
        console.error(`${t('Contact.send.error')} :`, error);
        setStatus(t('Contact.send.error'));
        setStatusVisible(true);
        setTimeout(() => setStatusVisible(false), 10000);
      });

    setName('');
    setEmail('');
    setMessage('');
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    resizeTextarea();
  };

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, []);

  return (
    <div className={styles.contactForm}>
      <motion.form
        initial='hidden'
        animate='show'
        variants={formAnimations.container}
        onSubmit={handleSubmit}
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={70}
            id='name'
            autoComplete='name'
            required
            data-test='name-input'
          />
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
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            id='email'
            autoComplete='email'
            required
            data-test='email-input'
          />
        </motion.div>

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
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            maxLength={1201}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                setMessage((prev) => prev + '\n');
                resizeTextarea();
              }
            }}
            id='message'
            required
            data-test='message-textarea'
          />
        </motion.div>

        {/* Honeypot */}
        <div style={{ display: 'none' }}>
          <label htmlFor='honey' data-test='honey-label'>
            honey is yummy
          </label>
          <input
            type='text'
            name='honey'
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            id='honey'
            data-test='honey-input'
          />
        </div>
        {/* Honeypot */}

        <motion.button
          variants={formAnimations.item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={
            theme === 'dark'
              ? ' bg-searchDark text-fontDarker'
              : ' bg-commentsLight text-fontLighter'
          }
          type='submit'
          style={{
            backgroundColor: isFormValid ? '#54c078' : '',
            color: isFormValid ? (theme === 'dark' ? 'black' : 'white') : '',
          }}
          data-test='submit-button'
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
            className={styles.status}
          >
            {status}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;
