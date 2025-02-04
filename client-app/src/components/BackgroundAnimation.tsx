import { motion } from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const BackgroundAnimation = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('BackgroundAnimation must be used within a ThemeProvider');
  }

  const backgroundColor = themeContext.theme === 'dark' ? '#1c1c1d' : '#f2f4f7';
  const particleColor = 'rgba(84, 192, 120, 0.3)'; // (#54c078)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className='fixed inset-0 -z-10' style={{ backgroundColor }}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-10 h-10 rounded-full blur-lg'
          style={{ backgroundColor: particleColor }}
          animate={{
            x: mousePosition.x - Math.random() * 50,
            y: mousePosition.y - Math.random() * 50,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 8,
            duration: 0.1,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundAnimation;
