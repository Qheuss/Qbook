import React, { useState } from 'react';
import {
  changeLanguage,
  getCurrentLanguage,
  SUPPORTED_LANGUAGES,
} from '@/i18n/i18n';
import styles from './LanguageSwitcher.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { cn, getBgColor, getTextColor } from '@/utils/cn';

interface Language {
  code: string;
}

const LanguageSwitcher: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const currentLanguage = getCurrentLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const languages: Language[] = SUPPORTED_LANGUAGES.map((lang) => ({
    code: lang,
  }));

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLanguageChange = (code: string) => {
    changeLanguage(code);
    setIsDrawerOpen(false);
  };

  const currentLang =
    languages.find((lang) => lang.code === currentLanguage) || languages[0];

  return (
    <div className={styles.container}>
      <button
        onClick={toggleDrawer}
        className={cn(
          styles.toggleButton,
          getBgColor(theme, 'search'),
          'text-accent pr-1 pl-2 md:pr-2 md:pl-3',
        )}
        aria-expanded={isDrawerOpen}
        aria-controls='language-drawer'
        onBlur={() => setTimeout(() => setIsDrawerOpen(false), 150)}
      >
        <span className={cn(styles.languageCode, 'text-sm')}>
          {currentLang.code.toUpperCase()}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={cn(
            styles.arrow,
            isDrawerOpen && styles.arrowOpen,
            'text-gray-500',
          )}
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            fillRule='evenodd'
            d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
            clipRule='evenodd'
          />
        </svg>
      </button>

      {/* Drawer */}
      <div
        id='language-drawer'
        className={cn(
          styles.drawer,
          isDrawerOpen ? styles.drawerOpen : styles.drawerClosed,
          getBgColor(theme, 'search'),
          getTextColor(theme, 'secondary'),
          'text-sm',
        )}
      >
        <div className={styles.drawerContent}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                styles.languageItem,
                currentLanguage === language.code
                  ? 'text-accent'
                  : 'hover:bg-accent-50',
              )}
              aria-label={`Switch to ${language.code}`}
            >
              <span className={styles.languageCode}>
                {language.code.toUpperCase()}
              </span>
              {currentLanguage === language.code && (
                <svg
                  className={cn(styles.checkIcon, 'text-accent')}
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
