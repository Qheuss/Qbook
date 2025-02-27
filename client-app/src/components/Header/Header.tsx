import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfileSection from './ProfileSection';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header
      className={
        styles.header + (theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
      }
    >
      <div className={styles.header__logoSearch}>
        <Logo />
        <SearchBar />
      </div>
      <Navigation />
      <ProfileSection />
    </header>
  );
};

export default Header;
