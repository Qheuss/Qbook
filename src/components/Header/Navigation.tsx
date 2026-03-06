import { useLocation } from '@tanstack/react-router';
import { NavItem } from './NavItem';
import { HiMiniHome } from 'react-icons/hi2';
import { IoIosMail } from 'react-icons/io';
// import { GiCalculator } from 'react-icons/gi';
import styles from './Navigation.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { cn, getBgColor, getDividerBorder } from '@/utils/cn';

interface NavigationProps {
  className?: string;
}

const Navigation = ({ className }: NavigationProps) => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.theme);

  const navItems = [
    { icon: HiMiniHome, path: '/' },
    { icon: IoIosMail, path: '/contact' },
    // { icon: GiCalculator, path: '/calculator'},
  ];

  return (
    <nav
      className={cn(
        styles.header__nav,
        'border-t md:border-none',
        getBgColor(theme, 'header'),
        getDividerBorder(theme),
        className,
      )}
    >
      {navItems.map((item) => (
        <NavItem
          key={item.path}
          {...item}
          selected={location.pathname === item.path}
        />
      ))}
    </nav>
  );
};

export default Navigation;
