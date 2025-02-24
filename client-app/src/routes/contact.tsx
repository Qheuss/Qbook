import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import ContactForm from '../components/Message/ContactForm';
import styles from './contact.module.scss';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className={styles.message}>
      <Header selectedPage={1} />
      <ContactForm />
    </div>
  );
}
