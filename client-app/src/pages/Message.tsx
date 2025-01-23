import Header from '../components/Header';
import styles from './Message.module.scss';

const Message = () => {
  return (
    <div className={styles.message}>
      <Header selectedPage={1} />
    </div>
  );
};

export default Message;
