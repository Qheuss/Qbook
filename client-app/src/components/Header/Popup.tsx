import { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import styles from './Popup.module.scss';
import { ThemeContext } from '../../context/ThemeContext';

const Popup = () => {
  const [popupClosed, setPopupClosed] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Popup must be used within a ThemeProvider');
  }
  return (
    <>
      {!popupClosed && (
        <div className={styles.popup}>
          <div
            className={
              styles.popup__arrow +
              (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
            }
          ></div>
          <div
            className={
              styles.popup__content +
              (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
            }
          >
            <span
              className={
                themeContext.theme === 'dark'
                  ? 'text-[#e2e5e9]'
                  : 'text-[#080809]'
              }
            >
              Téléchargez mon cv ici
            </span>
            <button
              className={styles.popup__close}
              onClick={() => setPopupClosed(true)}
            >
              <MdClose
                className={
                  themeContext.theme === 'dark'
                    ? 'text-[#a6a9ac]'
                    : 'text-[#606367]'
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
