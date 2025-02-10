import { useContext, useState } from 'react';
import styles from './Carousel.module.scss';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext';

const images = [
  'images/clickerlogin.png',
  'images/clickermoney.png',
  'images/aviron1.png',
  'images/aviron2.png',
  'images/aviron3.png',
  'images/weather.png',
  'images/Clicker.png',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemWidth = 100 / images.length;
  const gap = 7;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    if (currentIndex > 0)
      setCurrentIndex((prevIndex) => (prevIndex - 1) % images.length);
  };

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carousel__track}
        style={{
          transform: `translateX(-${currentIndex * (itemWidth + gap)}%)`,
        }}
      >
        {images.map((image, index) => (
          <div className={styles.carousel__item} key={index}>
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
          style={{
            opacity: currentIndex === 0 ? 0 : 1,
          }}
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
    </div>
  );
};

export default Carousel;
