import Header from '../components/Header';
import Title from '../components/Qbook/Feed';
import styles from './Qbook.module.scss';

const Qbook = () => {
  return (
    <div className={styles.qbook}>
      <Header selectedPage={0} />
      <Title />
    </div>
  );
};

export default Qbook;
