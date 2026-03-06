import styles from './ProfileSection.module.scss';
import { FaMoon } from 'react-icons/fa';
import { LuSunMedium } from 'react-icons/lu';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { toggleTheme } from '@/redux/themeSlice';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';
import { motion } from 'motion/react';
import { getBgColor } from '@/utils/cn';

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
          (theme === 'dark'
            ? `${getBgColor(theme, 'search')} text-white`
            : `${getBgColor(theme, 'search')} text-yellow-500`) + ' text-2xl'
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
        <a href={'/'}>
          <img src='images/QuentinHeusse.jpg' alt='Profile' />
        </a>
      </li>
    </ul>
  );
};

export default ProfileSection;
