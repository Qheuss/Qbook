import React from 'react';
import styles from './Modal.module.scss';
import { MdClose } from 'react-icons/md';

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, imageSrc, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <img src={imageSrc} alt='Modal content' />
        <button className={styles.modal__close} onClick={onClose}>
          <MdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
