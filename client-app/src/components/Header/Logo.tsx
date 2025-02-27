import { useNavigate } from '@tanstack/react-router';
import styles from './Logo.module.scss';
import { useAppSelector } from '../../redux/hooks';

const Logo = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <button className={styles.logo} onClick={() => navigate({ to: '/' })}>
      <img
        src={theme === 'dark' ? '/images/QDark.svg' : '/images/QLight.svg'}
      />
    </button>
  );
};

export default Logo;
