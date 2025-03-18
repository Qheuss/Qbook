import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './ContactForm.module.scss';
import { useAppSelector } from '../../redux/hooks';

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
      setStatus('Bot detecté, message non envoyé.');
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
        console.log(
          'Message sent successfully!',
          response.status,
          response.text
        );
        setStatus('Message envoyé!');
        setStatusVisible(true);
        setTimeout(() => setStatusVisible(false), 10000);
      })
      .catch((error) => {
        console.error('Failed to send message. Error:', error);
        setStatus("Erreur lors de l'envoi du message.");
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
      <form
        onSubmit={handleSubmit}
        id='contact-form'
        name='contact-form'
        className={
          'w-[100%] md:w-[680px] md:rounded-lg' +
          (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
        }
      >
        <h1 className={theme === 'dark' ? ' text-fontDark' : ' text-fontLight'}>
          Laissez moi un <span>message</span> !
        </h1>
        <div>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='name'
            data-test='name-label'
          >
            Nom:
          </label>
          <input
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
        </div>
        <div>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='email'
            data-test='email-label'
          >
            Adresse email:
          </label>
          <input
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
        </div>
        <div>
          <label
            className={
              theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter'
            }
            htmlFor='message'
            data-test='message-label'
          >
            Message:
          </label>
          <textarea
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
        </div>

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

        <button
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
          Envoyer le message
        </button>
      </form>

      {statusVisible && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default ContactForm;
