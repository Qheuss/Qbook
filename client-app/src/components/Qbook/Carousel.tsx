import { useRef, useState } from 'react';
import styles from './Carousel.module.scss';
import Modal from '../Modal';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { useAppSelector } from '../../redux/hooks';

const images: string[] = [
  'images/clickerlogin.png',
  'images/clickermoney.png',
  'images/aviron1.png',
  'images/aviron2.png',
  'images/aviron3.png',
  'images/weather.png',
];

const Carousel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const theme = useAppSelector((state) => state.theme.theme);

  const scrollAmount = 200;

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

      {/* Modal */}
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
