import { createFileRoute } from '@tanstack/react-router';
import Header from '../components/Header';
import styles from './calculator.module.scss';

export const Route = createFileRoute('/calculator')({
  component: Calculator,
});

function Calculator() {
  return (
    <div className={styles.calculator}>
      <Header selectedPage={2} />
    </div>
  );
}
