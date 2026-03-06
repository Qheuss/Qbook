import { useRef, useState, useEffect, useCallback } from 'react';
import styles from './Carousel.module.scss';
import Modal from '../Modal';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';
import { CAROUSEL_IMAGES, SCROLL_AMOUNT } from './constants';
import { cn } from '@/utils/cn';

const Carousel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const checkScrollPosition = useCallback(() => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const trackElement = trackRef.current;

    if (trackElement) {
      trackElement.addEventListener('scroll', checkScrollPosition);
    }
    window.addEventListener('resize', checkScrollPosition);

    return () => {
      if (trackElement) {
        trackElement.removeEventListener('scroll', checkScrollPosition);
      }
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  };

  const handleClickItem = (index: number): void => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.documentElement.classList.add('popup-active');
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    document.documentElement.classList.remove('popup-active');
  };

  const buttonClassName = cn(
    styles.carousel__button,
    theme === 'dark'
      ? 'bg-[#00000099] text-[#fff]'
      : 'bg-[#fff] text-[#00000099] shadow-md',
  );

  return (
    <div className={styles.carousel}>
      {!isAtStart && (
        <button
          className={cn(buttonClassName, styles.left)}
          onClick={scrollLeft}
          aria-label='Scroll left'
        >
          <MdOutlineArrowBackIosNew />
        </button>
      )}

      <div className={styles.track} ref={trackRef}>
        {CAROUSEL_IMAGES.map((image, index) => (
          <div
            key={image}
            className={styles.item}
            onClick={() => handleClickItem(index)}
            role='button'
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleClickItem(index)}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {!isAtEnd && (
        <button
          className={cn(buttonClassName, styles.right)}
          onClick={scrollRight}
          aria-label='Scroll right'
        >
          <MdOutlineArrowForwardIos />
        </button>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          imageSrc={CAROUSEL_IMAGES[modalImageIndex]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Carousel;
