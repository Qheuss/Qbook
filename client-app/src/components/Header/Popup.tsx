import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './Popup.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';

const Popup = () => {
  const [popupClosed, setPopupClosed] = useState<boolean>(false);
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <>
      {!popupClosed && (
        <div className={styles.popup + ' hidden lg:block'}>
          <div
            className={
              styles.popup__arrow +
              (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
            }
          ></div>
          <div
            className={
              styles.popup__content +
              (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
            }
          >
            <span
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Header.popup')}
            </span>
            <button
              className={styles.popup__close}
              onClick={() => setPopupClosed(true)}
            >
              <MdClose
                className={
                  theme === 'dark' ? 'text-fontDarker' : 'text-fontLighter'
                }
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
