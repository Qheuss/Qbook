import styles from './Header.module.scss';
import { HiMiniHome } from 'react-icons/hi2';

import { GiCalculator } from 'react-icons/gi';
import { FaMoon } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdSearch, IoIosMail } from 'react-icons/io';
import { LuSunMedium } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { useContext } from 'react';
import { NavItem } from './NavItem';

interface HeaderProps {
  selectedPage: number;
}

const Header = ({ selectedPage }: HeaderProps) => {
  const navigate = useNavigate();

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  const navItems = [
    { icon: HiMiniHome, path: '/', index: 0 },
    { icon: IoIosMail, path: '/leaveamessage', index: 1 },
    { icon: GiCalculator, path: '/calculator', index: 2 },
  ];

  return (
    <section
      className={
        styles.header +
        (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-white')
      }
    >
      <div className={styles.header__logo}>
        <img
          className={styles.logo}
          src='/images/Q.svg'
          onClick={() => navigate('/')}
        />
        <div className={styles.searchBar}>
          <label htmlFor='search'>
            <IoMdSearch />
          </label>
          <input id='search' type='text' placeholder='Rechercher' />
        </div>
      </div>
      <ul className={styles.header__middle}>
        {navItems.map((item) => (
          <NavItem
            key={item.index}
            {...item}
            selectedPage={selectedPage}
            navigate={navigate}
          />
        ))}
      </ul>
      <ul className={styles.header__profile}>
        <li>
          <button onClick={themeContext.toggleTheme}>
            {themeContext.theme === 'dark' ? (
              <FaMoon className='text-white text-2xl hover:text-yellow-500' />
            ) : (
              <LuSunMedium className='text-yellow-500 text-2xl hover:text-white' />
            )}
          </button>
        </li>
        <li>
          <a
            href='CV-Quentin_Heusse.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='images/QuentinHeusse.jpg' alt='Profile' />
            <HiOutlineDownload />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Header;
