import { useState } from 'react';
import styles from './Carousel.module.scss';
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md';

const images = [
  'images/Clicker.png',
  'images/Clicker.png',
  'images/Clicker.png',
  'images/Clicker.png',
  'images/Clicker.png',
  'images/Clicker.png',
  'images/Clicker.png',
];

// TODO: Fix les mouvements du carousel

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % images.length);
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.carousel__track}
        style={{ transform: `translateX(-${currentIndex * 20}%)` }}
      >
        {images.map((image, index) => (
          <div className={styles.carousel__item} key={index}>
            <img src={image} alt={`image ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className={styles.carousel__controls}>
        <button
          className={styles.carousel__button}
          onClick={prevSlide}
          style={{ opacity: currentIndex === 0 ? '0' : '1' }}
        >
          <MdOutlineArrowBackIosNew />
        </button>
        <button className={styles.carousel__button} onClick={nextSlide}>
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
