import { useContext, useState } from 'react';
import styles from './Carousel.module.scss';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext';
import Modal from './Modal';

const images: string[] = [
  'images/clickerlogin.png',
  'images/clickermoney.png',
  'images/aviron1.png',
  'images/aviron2.png',
  'images/aviron3.png',
  'images/weather.png',
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);

  const gap = 7;
  const itemWidth = 150;

  const nextSlide = () => {
    if (currentIndex === images.length - 4) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 4);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleClickItem = (index: number): void => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setModalImageIndex(null);
  };

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Carousel must be used within a ThemeProvider');
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carousel__track}
        style={{
          transform: `translateX(-${currentIndex * (itemWidth + gap)}px)`,
        }}
      >
        {images.map((image, index) => (
          <div
            className={styles.carousel__item}
            key={index}
            onClick={() => handleClickItem(index)}
          >
            <img src={image} alt={`image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.carousel__controls}>
        <button
          className={
            styles.carousel__button +
            (themeContext.theme === 'dark'
              ? ' bg-[#252728] text-[#a6a9ac]'
              : ' bg-[#f0f2f5] text-[#606367]')
          }
          onClick={prevSlide}
        >
          <MdOutlineArrowBackIosNew />
        </button>
        <button
          className={
            styles.carousel__button +
            (themeContext.theme === 'dark'
              ? ' bg-[#252728] text-[#a6a9ac]'
              : ' bg-[#f0f2f5] text-[#606367]')
          }
          onClick={nextSlide}
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        imageSrc={images[modalImageIndex!]}
        onClose={closeModal}
      />
    </div>
  );
};

export default Carousel;
