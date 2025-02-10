import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
  RefObject,
} from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import styles from './Dialog.module.scss';

export function createDialog(
  renderDialog: (
    resolve: () => void,
    reject: () => void,
    inputRef: RefObject<HTMLInputElement>,
    isToggleChecked: () => void,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>
  ) => React.ReactNode
) {
  return new Promise((resolve, reject) => {
    const dialogContainer = document.createElement('div');
    document.body.appendChild(dialogContainer);

    const root = createRoot(dialogContainer);

    const Dialog = () => {
      const inputRef = useRef<HTMLInputElement>(null);
      const [inputValue, setInputValue] = useState<string>('');
      const [isToggleChecked, setIsToggleChecked] = useState<boolean>(false);

      const toggleChecked = () => {
        setIsToggleChecked((prev) => !prev);
      };

      const closeDialog = () => {
        if (dialogContainer.parentNode) {
          document.body.removeChild(dialogContainer);
        }
      };

      const resolveValue = useCallback(() => {
        resolve({ inputValue, isToggleChecked });
        closeDialog();
      }, [inputValue, isToggleChecked]);

      const rejectValue = useCallback(() => {
        reject();
        closeDialog();
      }, []);

      const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            resolveValue();
          }
          if (event.key === 'Escape') {
            rejectValue();
          }
        },
        [resolveValue, rejectValue]
      );

      useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, [handleKeyDown]);

      return createPortal(
        <div className={styles.dialogContainer} role='dialog'>
          <div className={styles.dialogBackground} onClick={rejectValue} />
          <div className={styles.dialog}>
            {renderDialog(
              resolveValue,
              rejectValue,
              inputRef,
              toggleChecked,
              inputValue,
              setInputValue
            )}
          </div>
        </div>,
        dialogContainer
      );
    };

    root.render(<Dialog />);
  });
}
