import { useMemo } from 'react';
import { createDialog } from '../Dialog';
import styles from './Title.module.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

import Socials from './Socials';
import { useNavigate } from '@tanstack/react-router';
import { useAppSelector } from '../../redux/hooks';

const Title = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.theme);

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
        <div
          className={
            styles.dialog +
            (theme === 'dark'
              ? ' bg-[#252728] text-[#a6a9ac]'
              : ' bg-[#f0f2f5] text-[#606367]')
          }
        >
          <section>
            <h4
              className={
                theme === 'dark' ? ' text-[#e2e5e9]' : ' text-[#080809]'
              }
            >
              Me contacter
            </h4>
            <p>
              Souhaitez-vous me contacter? Je vous répondrai dans les plus brefs
              délais.
            </p>
          </section>
          <div>
            <button
              onClick={resolve}
              style={{ color: '#54c078' }}
              className={theme === 'dark' ? ' bg-[#333334]' : ' bg-[#f5f5f5]'}
            >
              Oui
            </button>
            <button
              onClick={reject}
              className={
                theme === 'dark'
                  ? ' bg-[#333334] text-[#a6a9ac]'
                  : ' bg-[#f5f5f5] text-[#606367]'
              }
            >
              Non
            </button>
          </div>
        </div>
      )).then(
        async () => {
          navigate({ to: '/contact' });
        },
        () => {}
      );
    };
  }, [navigate, theme]);

  return (
    <div
      className={
        styles.title + (theme === 'dark' ? ' bg-[#252728]' : ' bg-[#fff]')
      }
    >
      <div>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <button
          onClick={contact}
          className={
            theme === 'dark'
              ? ' bg-[#333334] text-[#a6a9ac]'
              : ' bg-[#f0f2f5] text-[#606367]'
          }
        >
          <h1>Cliquez ici pour me contacter!</h1>
        </button>
      </div>
      <div
        className={
          styles.lineBreak +
          (theme === 'dark' ? ' bg-[#ffffff13]' : ' bg-[#e2e2e2]')
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
