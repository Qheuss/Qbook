import Header from '../components/Header';
import styles from './Calculator.module.scss';

const Calculator = () => {
  return (
    <div className={styles.calculator}>
      <Header selectedPage={2} />
    </div>
  );
};

export default Calculator;
