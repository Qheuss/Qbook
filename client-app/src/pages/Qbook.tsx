import Footer from '../components/Footer';
import Header from '../components/Header';
import Feed from '../components/Qbook/Feed';
import styles from './Qbook.module.scss';

const Qbook = () => {
  return (
    <div className={styles.qbook}>
      <Header selectedPage={0} />
      <Feed />
      <Footer />
    </div>
  );
};

export default Qbook;
