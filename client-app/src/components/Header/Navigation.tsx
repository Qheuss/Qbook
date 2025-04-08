import { useLocation } from '@tanstack/react-router';
import { NavItem } from './NavItem';
import { HiMiniHome } from 'react-icons/hi2';
import { IoIosMail } from 'react-icons/io';
// import { GiCalculator } from 'react-icons/gi';
import styles from './Navigation.module.scss';
import { useAppSelector } from '@/redux/hooks';

interface Navigation {
  className?: string;
}

const Navigation = ({ className }: Navigation) => {
  const location = useLocation();
  const theme = useAppSelector((state) => state.theme.theme);

  const navItems = [
    { icon: HiMiniHome, path: '/', index: 0 },
    { icon: IoIosMail, path: '/contact', index: 1 },
    // { icon: GiCalculator, path: '/calculator', index: 2 },
  ];
  return (
    <nav
      className={
        styles.header__nav +
        ' border-t md:border-none' +
        (theme === 'dark'
          ? ' bg-headerDark border-[#ffffff13]'
          : ' bg-headerLight border-[#e2e2e2]') +
        ' ' +
        className
      }
    >
      {navItems.map((item) => (
        <NavItem
          key={item.index}
          {...item}
          selected={location.pathname === item.path}
        />
      ))}
    </nav>
  );
};

export default Navigation;
