import styles from './Footer.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { cn, getTextColor } from '@/utils/cn';

const Footer = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <footer className={cn(styles.footer, getTextColor(theme, 'primary'))}>
      <span>Quentin Heusse | {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
