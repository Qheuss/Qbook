import { useRef, useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import Modal from '../Modal';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { useAppSelector } from '@/redux/hooks';

const images: string[] = [
  'images/francorchamps1.png',
  'images/francorchamps2.png',
  'images/francorchamps3.png',
  'images/francorchamps4.png',
  'images/francorchamps5.png',
  'images/francorchamps6.png',
  'images/aviron1.png',
  'images/aviron2.png',
  'images/aviron3.png',
  'images/clickerlogin.png',
  'images/clickermoney.png',
  'images/weather.png',
];

const Carousel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const scrollAmount = 200;

  const checkScrollPosition = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setIsAtStart(scrollLeft <= 0);
      setIsAtEnd(Math.ceil(scrollLeft + clientWidth) >= scrollWidth);
    }
  };

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
  }, []);

  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleClickItem = (index: number): void => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.documentElement.classList.add('popup-active');
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalImageIndex(null);
    document.documentElement.classList.remove('popup-active');
  };

  return (
    <div className={styles.carousel}>
      {!isAtStart && (
        <button
          className={
            styles.carousel__button +
            ' ' +
            styles.left +
            (theme === 'dark'
              ? ' bg-[#00000099] text-[#fff]'
              : ' bg-[#fff] text-[#00000099] shadow-md')
          }
          onClick={scrollLeft}
        >
          <MdOutlineArrowBackIosNew />
        </button>
      )}

      <div className={styles.track} ref={trackRef}>
        {images.map((image, index) => (
          <div
            key={index}
            className={styles.item}
            onClick={() => handleClickItem(index)}
          >
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {!isAtEnd && (
        <button
          className={
            styles.carousel__button +
            ' ' +
            styles.right +
            (theme === 'dark'
              ? ' bg-[#00000099] text-[#fff]'
              : ' bg-[#fff] text-[#00000099] shadow-md')
          }
          onClick={scrollRight}
        >
          <MdOutlineArrowForwardIos />
        </button>
      )}

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          imageSrc={images[modalImageIndex!]}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Carousel;
