import { useState, useRef, useCallback } from 'react';
import styles from './Modal.module.scss';
import { MdClose, MdZoomIn, MdZoomOut } from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  isOpen: boolean;
  imageSrc: string;
  onClose: () => void;
}

const Modal = ({ isOpen, imageSrc, onClose }: ModalProps) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const { t } = useTranslation();

  const getBoundedPosition = useCallback(
    (x: number, y: number) => {
      if (scale <= 1 || !imageRef.current || !containerRef.current)
        return { x: 0, y: 0 };

      const scaledWidth = imageRef.current.offsetWidth * scale;
      const scaledHeight = imageRef.current.offsetHeight * scale;
      const xLimit = Math.max(
        0,
        (scaledWidth - containerRef.current.offsetWidth) / 2
      );
      const yLimit = Math.max(
        0,
        (scaledHeight - containerRef.current.offsetHeight) / 2
      );

      return {
        x: Math.min(xLimit, Math.max(-xLimit, x)),
        y: Math.min(yLimit, Math.max(-yLimit, y)),
      };
    },
    [scale]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition(
        getBoundedPosition(e.clientX - dragStart.x, e.clientY - dragStart.y)
      );
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && scale > 1 && e.touches.length === 1) {
      setPosition(
        getBoundedPosition(
          e.touches[0].clientX - dragStart.x,
          e.touches[0].clientY - dragStart.y
        )
      );
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.5, 1));
  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} aria-modal='true' onClick={onClose}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.modal__imageContainer}
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={styles.modal__imageWrapper}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <img
              ref={imageRef}
              src={imageSrc}
              alt='Modal content'
              style={{
                transform: `scale(${scale}) translate(${
                  position.x / scale
                }px, ${position.y / scale}px)`,
                transition: isDragging ? 'none' : 'transform 0.2s ease-out',
                cursor: isDragging
                  ? 'grabbing'
                  : scale > 1
                  ? 'grab'
                  : 'default',
              }}
              draggable='false'
            />
          </div>
        </div>

        <div
          className={
            styles.modal__controls +
            ' border-t' +
            (theme === 'dark'
              ? ' bg-searchDark text-fontDarker border-iconsDark'
              : ' bg-searchLight text-fontLighter border-iconsLight')
          }
        >
          <button
            onClick={handleZoomOut}
            className={
              styles.modal__zoomButton +
              ' border' +
              (theme === 'dark'
                ? ' border-iconsDark hover:bg-buttonHoverDark'
                : ' border-iconsLight hover:bg-buttonHoverLight')
            }
            disabled={scale === 1}
          >
            <MdZoomOut />
          </button>
          <button
            onClick={handleZoomIn}
            className={
              styles.modal__zoomButton +
              ' border' +
              (theme === 'dark'
                ? ' hover:bg-buttonHoverDark border-iconsDark'
                : ' hover:bg-buttonHoverLight border-iconsLight')
            }
          >
            <MdZoomIn />
          </button>
          <button
            onClick={handleReset}
            className={
              styles.modal__resetButton +
              ' border' +
              (theme === 'dark'
                ? ' hover:bg-buttonHoverDark border-iconsDark'
                : ' hover:bg-buttonHoverLight border-iconsLight')
            }
            disabled={scale === 1 && position.x === 0 && position.y === 0}
          >
            {t('Modal.reset')}
          </button>
          <button
            className={
              styles.modal__close +
              ' border' +
              (theme === 'dark'
                ? ' hover:bg-buttonHoverDark border-iconsDark'
                : ' hover:bg-buttonHoverLight border-iconsLight')
            }
            onClick={onClose}
          >
            <MdClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
