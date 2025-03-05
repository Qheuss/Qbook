import { useNavigate } from '@tanstack/react-router';
import styles from './Logo.module.scss';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button className={styles.logo} onClick={() => navigate({ to: '/' })}>
      <img src='/images/Q.svg' />
    </button>
  );
};

export default Logo;
