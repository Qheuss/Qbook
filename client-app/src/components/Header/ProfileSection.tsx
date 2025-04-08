import { FaMoon } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { LuSunMedium } from 'react-icons/lu';

import Popup from './Popup';
import styles from './ProfileSection.module.scss';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme } from '@/redux/themeSlice';
import LanguageSwitcher from './LanguageSwitcher';

const ProfileSection = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ul className={styles.header__profile}>
      <li>
        <LanguageSwitcher />
      </li>
      <li
        className={
          theme === 'dark'
            ? 'bg-searchDark text-white text-2xl hover:text-yellow-500'
            : 'bg-searchLight text-yellow-500 text-2xl hover:text-white'
        }
      >
        <button onClick={handleToggleTheme}>
          {theme === 'dark' ? <FaMoon /> : <LuSunMedium />}
        </button>
      </li>
      <li>
        <a
          href='CV-Quentin_Heusse.pdf'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img src='images/QuentinHeusse.jpg' alt='Profile' />
          <HiOutlineDownload
            className={
              theme === 'dark'
                ? 'bg-iconsDark text-iconsLight'
                : 'bg-iconsLight text-iconsDark'
            }
          />
        </a>
        <Popup />
      </li>
    </ul>
  );
};

export default ProfileSection;
