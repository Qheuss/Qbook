import Popup from './Popup';
import styles from './ProfileSection.module.scss';
import { FaMoon } from 'react-icons/fa';
import { HiOutlineDownload } from 'react-icons/hi';
import { LuSunMedium } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme } from '@/redux/themeSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { motion } from 'motion/react';

const ProfileSection = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const handleToggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      dispatch(toggleTheme());
      setIsAnimating(false);
    }, 300);
  };

  return (
    <ul className={styles.header__profile}>
      <li>
        <LanguageSwitcher />
      </li>
      <li
        className={
          theme === 'dark'
            ? 'bg-searchDark text-white text-2xl'
            : 'bg-searchLight text-yellow-500 text-2xl'
        }
      >
        <motion.button
          onClick={handleToggleTheme}
          animate={isAnimating ? { rotate: 360 } : {}}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {theme === 'dark' ? <FaMoon /> : <LuSunMedium />}
        </motion.button>
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
