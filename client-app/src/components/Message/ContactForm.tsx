import React, { useEffect, useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import styles from './ContactForm.module.scss';

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
      setStatus('Bot detected, form not submitted.');
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
      .then(
        (response) => {
          console.log(
            'Email sent successfully!',
            response.status,
            response.text
          );
          setStatus('Message sent successfully!');
          setStatusVisible(true);

          setName('');
          setEmail('');
          setMessage('');

          setTimeout(() => setStatusVisible(false), 10000);
        },
        (err) => {
          console.error('Failed to send message.', err);
          setStatus('Failed to send message.');
          setStatusVisible(true);
          setTimeout(() => setStatusVisible(false), 10000);
        }
      );
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  // TODO: effet prendre le formulaire avec la souris et le bouger + faire fonctionner la barre de recherche

  return (
    <div className={styles.contactForm}>
      <form onSubmit={handleSubmit}>
        <h2>
          Laissez moi un <span>message</span> !
        </h2>
        <div>
          <label>Nom:</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={70}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={320}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            maxLength={1201}
            required
          />
        </div>

        {/* Honeypot */}
        <div style={{ display: 'none' }}>
          <label>Leave this field empty</label>
          <input
            type='text'
            name='honey'
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <button
          type='submit'
          style={{
            backgroundColor: isFormValid ? '#54c078' : '',
            color: isFormValid ? 'black' : '',
          }}
          disabled={!isFormValid}
        >
          Send Message
        </button>
      </form>

      {statusVisible && <p className={styles.status}>{status}</p>}
    </div>
  );
};

export default ContactForm;
