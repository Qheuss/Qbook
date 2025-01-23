import styles from './Header.module.scss';
import { HiMiniHome } from 'react-icons/hi2';

import { GiCalculator } from 'react-icons/gi';
import { FaMoon } from 'react-icons/fa6';
import { HiOutlineDownload } from 'react-icons/hi';
import { IoMdSearch } from 'react-icons/io';
import { IoIosMail } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  selectedPage: number;
}

const Header = ({ selectedPage }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <section className={styles.header}>
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
        <li
          style={{
            borderBottom: selectedPage === 0 ? '2px solid #54c078' : 'none',
          }}
        >
          <div
            style={{
              backgroundColor: selectedPage === 0 ? 'transparent' : '',
            }}
            onClick={() => navigate('/')}
          >
            <HiMiniHome
              style={{
                color: selectedPage === 0 ? '#54c078' : '#a6a9ac',
              }}
            />
          </div>
        </li>
        <li
          style={{
            borderBottom: selectedPage === 1 ? '2px solid #54c078' : 'none',
          }}
        >
          <div
            style={{
              backgroundColor: selectedPage === 1 ? 'transparent' : '',
            }}
            onClick={() => navigate('/leaveamessage')}
          >
            <IoIosMail
              style={{ color: selectedPage === 1 ? '#54c078' : '#a6a9ac' }}
            />
          </div>
        </li>
        <li
          style={{
            borderBottom: selectedPage === 2 ? '2px solid #54c078' : 'none',
          }}
        >
          <div
            style={{
              backgroundColor: selectedPage === 2 ? 'transparent' : '',
            }}
            onClick={() => navigate('/calculator')}
          >
            <GiCalculator
              style={{ color: selectedPage === 2 ? '#54c078' : '#a6a9ac' }}
            />
          </div>
        </li>
      </ul>
      <ul className={styles.header__profile}>
        <li>
          <FaMoon />
        </li>
        <li>
          <a href='CV.pdf' target='_blank' rel='noopener noreferrer'>
            <img src='images/QuentinHeusse.jpg' alt='Profile' />
            <HiOutlineDownload />
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Header;
