import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from '@tanstack/react-router';
import styles from './Logo.module.scss';

const Logo = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Logo must be used within a ThemeProvider');
  }
  return (
    <button className={styles.logo} onClick={() => navigate({ to: '/' })}>
      <img
        src={
          themeContext.theme === 'dark'
            ? '/images/QDark.svg'
            : '/images/QLight.svg'
        }
      />
    </button>
  );
};

export default Logo;
