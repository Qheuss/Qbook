import { Link } from '@tanstack/react-router';
import styles from './Logo.module.scss';

const Logo = () => {
  return (
    <Link className={styles.logo} to='/'>
      <img src='/images/Q.svg' />
    </Link>
  );
};

export default Logo;
