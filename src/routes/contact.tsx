import { createFileRoute } from '@tanstack/react-router';
import ContactForm from '@/components/Contact/ContactForm';
import styles from './contact.module.scss';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

function Contact() {
  return (
    <div className={styles.contact + ' block md:flex mt-4 md:mt-0'}>
      <ContactForm />
    </div>
  );
}
