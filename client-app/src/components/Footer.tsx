import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import styles from './Footer.module.scss';

const Footer = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Footer must be used within a ThemeProvider');
  }
  return (
    <footer
      className={
        styles.footer +
        (themeContext.theme === 'dark' ? ' text-[#e2e5e9]' : ' text-[#080809]')
      }
    >
      <span>Quentin Heusse | 2025</span>
    </footer>
  );
};

export default Footer;
