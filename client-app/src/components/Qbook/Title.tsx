import { useContext, useMemo } from 'react';
import { createDialog } from '../Dialog';
import styles from './Title.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { ThemeContext } from '../../context/ThemeContext';
import Socials from './Socials';

const Title = () => {
  const navigate = useNavigate();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Title must be used within a ThemeProvider');
  }

  const socials = [
    {
      icon: FaLinkedin,
      link: 'https://www.linkedin.com/in/quentin-heusse',
      colorDark: '#0a66c2',
      colorLight: '#0a66c2',
      text: 'Linkedin',
    },
    {
      icon: FaGithub,
      link: 'https://github.com/Qheuss',
      colorDark: '#fff',
      colorLight: '#000',
      text: 'Github',
    },
  ];

  const contact = useMemo(() => {
    return async () => {
      createDialog((resolve, reject) => (
        <>
          <section>
            <h4>Me contacter</h4>
            <p>
              Souhaitez-vous me contacter? Je vous répondrai dans les plus brefs
              délais.
            </p>
          </section>
          <div>
            <button onClick={resolve} style={{ color: '#54c078' }}>
              Oui
            </button>
            <button onClick={reject}>Non</button>
          </div>
        </>
      )).then(
        async () => {
          navigate('/message');
        },
        () => {}
      );
    };
  }, [navigate]);

  return (
    <div
      className={
        styles.title +
        (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
      }
    >
      <div>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <button
          onClick={contact}
          className={
            themeContext.theme === 'dark'
              ? ' bg-[#333334] text-[#a6a9ac]'
              : ' bg-[#f0f2f5] text-[#606367]'
          }
        >
          <h1>Portfolio de Quentin Heusse</h1>
        </button>
      </div>
      <div
        className={
          styles.lineBreak +
          (themeContext.theme === 'dark' ? ' bg-[#ffffff13]' : ' bg-[#e2e2e2]')
        }
      ></div>
      <ul>
        {socials.map((item, i) => (
          <Socials key={i} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default Title;
