import styles from './Footer.module.scss';
import { useAppSelector } from '@/redux/hooks';

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <footer
      className={
        styles.footer +
        (theme === 'dark' ? ' text-fontDark' : ' text-fontLight')
      }
    >
      <span>Quentin Heusse | 2025</span>
    </footer>
  );
};

export default Footer;
