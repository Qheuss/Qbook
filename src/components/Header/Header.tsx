import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfileSection from './ProfileSection';
import { useAppSelector } from '@/redux/hooks';
import { cn, getBgColor } from '@/utils/cn';

const Header = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header>
      <div
        className={cn(
          styles.header,
          getBgColor(theme, 'header'),
          'static md:fixed md:px-5 px-2.5',
        )}
      >
        <div className={styles.header__logoSearch}>
          <Logo />
          <SearchBar />
        </div>
        <Navigation className='hidden md:flex' />
        <ProfileSection />
      </div>
      <Navigation className='md:hidden flex' />
    </header>
  );
};

export default Header;
