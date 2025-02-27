import { FaMoon } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { LuSunMedium } from 'react-icons/lu';

import Popup from './Popup';
import styles from './ProfileSection.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { toggleTheme } from '../../redux/themeSlice';

const ProfileSection = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <ul className={styles.header__profile}>
      <li className={theme === 'dark' ? 'bg-[#4f5152]' : 'bg-[#e3e4e6]'}>
        <button onClick={handleToggleTheme}>
          {theme === 'dark' ? (
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
          <HiOutlineDownload
            className={
              theme === 'dark'
                ? 'bg-[#4f5152] text-[#e3e4e6]'
                : 'bg-[#e3e4e6] text-[#4f5152]'
            }
          />
        </a>
        <Popup />
      </li>
    </ul>
  );
};

export default ProfileSection;
