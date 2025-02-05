import ContactForm from '../components/Message/ContactForm';
import Header from '../components/Header';
import styles from './Message.module.scss';

const Message = () => {
  return (
    <div className={styles.message}>
      <Header selectedPage={1} />
      <ContactForm />
    </div>
  );
};

export default Message;
