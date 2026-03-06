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

interface CarouselProps {
  images?: string[];
  singleImage?: boolean;
}

const Carousel: React.FC<CarouselProps> = ({ images, singleImage = false }) => {
  const carouselImages = images || CAROUSEL_IMAGES;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number>(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
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

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1,
    );
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === carouselImages.length - 1 ? 0 : prev + 1,
    );
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

  if (singleImage) {
    return (
      <div className={styles.carousel} style={{ minHeight: '400px' }}>
        {carouselImages.length > 1 && (
          <button
            className={cn(buttonClassName, styles.left)}
            onClick={goToPreviousImage}
            aria-label='Previous image'
          >
            <MdOutlineArrowBackIosNew />
          </button>
        )}

        <div
          className={styles.track}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          data-single-image='true'
        >
          <div
            className={cn(styles.item, styles.singleImageItem)}
            onClick={() => {
              setModalImageIndex(currentImageIndex);
              setIsModalOpen(true);
              document.documentElement.classList.add('popup-active');
            }}
            role='button'
            tabIndex={0}
            onKeyDown={(e) =>
              e.key === 'Enter' &&
              (setModalImageIndex(currentImageIndex),
              setIsModalOpen(true),
              document.documentElement.classList.add('popup-active'))
            }
          >
            <img
              src={carouselImages[currentImageIndex]}
              alt={`Slide ${currentImageIndex + 1}`}
            />
          </div>
        </div>

        {carouselImages.length > 1 && (
          <button
            className={cn(buttonClassName, styles.right)}
            onClick={goToNextImage}
            aria-label='Next image'
          >
            <MdOutlineArrowForwardIos />
          </button>
        )}

        {isModalOpen && (
          <Modal
            isOpen={isModalOpen}
            imageSrc={carouselImages[modalImageIndex]}
            onClose={() => {
              setIsModalOpen(false);
              document.documentElement.classList.remove('popup-active');
            }}
          />
        )}
      </div>
    );
  }

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
        {carouselImages.map((image, index) => (
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
          imageSrc={carouselImages[modalImageIndex]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Carousel;
