import styles from './Header.module.scss';
import { ThemeContext } from './../../context/ThemeContext';
import { useContext } from 'react';
import SearchBar from './SearchBar';
import Logo from './Logo';
import Navigation from './Navigation';
import ProfileSection from './ProfileSection';

const Header = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Header must be used within a ThemeProvider');
  }

  return (
    <header
      className={
        styles.header +
        (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
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
