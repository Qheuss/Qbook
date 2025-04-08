import React, { useState } from 'react';
import { changeLanguage, getCurrentLanguage } from '@/i18n/i18n';
import styles from './LanguageSwitcher.module.scss';
import { useAppSelector } from '@/redux/hooks';

interface Language {
  code: string;
}

const LanguageSwitcher: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const currentLanguage = getCurrentLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const languages: Language[] = [{ code: 'en' }, { code: 'fr' }];

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
        className={`${styles.toggleButton} ${
          theme === 'dark' ? 'bg-searchDark' : 'bg-searchLight'
        }  text-accent pr-1 pl-2 md:pr-2 md:pl-3`}
        aria-expanded={isDrawerOpen}
        aria-controls='language-drawer'
      >
        <span className={styles.languageCode + ' text-sm'}>
          {currentLang.code.toUpperCase()}
        </span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${styles.arrow} ${
            isDrawerOpen ? styles.arrowOpen : ''
          } text-gray-500`}
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
        className={`${styles.drawer} ${
          isDrawerOpen ? styles.drawerOpen : styles.drawerClosed
        }
        ${
          theme === 'dark'
            ? ' bg-searchDark text-fontDarker'
            : ' bg-searchLight text-fontLighter'
        } text-sm`}
      >
        <div className={styles.drawerContent}>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`${styles.languageItem} ${
                currentLanguage === language.code
                  ? 'text-accent'
                  : 'hover:bg-accent-50'
              }`}
              aria-label={`Switch to ${language.code}`}
            >
              <span className={styles.languageCode}>
                {language.code.toUpperCase()}
              </span>
              {currentLanguage === language.code && (
                <svg
                  className={`${styles.checkIcon} text-accent`}
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
