import styles from './Header.module.scss';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfileSection from './ProfileSection';
import { useAppSelector } from '../../redux/hooks';

const Header = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <header>
      <div
        className={
          styles.header +
          (theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]') +
          ' static md:fixed'
        }
      >
        <div className={styles.header__logoSearch}>
          <Logo />
          <SearchBar />
        </div>
        <Navigation className={'hidden md:flex'} />
        <ProfileSection />
      </div>
      <Navigation className={'md:hidden flex'} />
    </header>
  );
};

export default Header;
