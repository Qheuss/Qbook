import { useMemo } from 'react';
import { createDialog } from '../Dialog';
import styles from './Title.module.scss';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import Socials from './Socials';
import { useNavigate } from '@tanstack/react-router';
import { useAppSelector } from '@/redux/hooks';

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

  const createContactDialog = useMemo(() => {
    return async () => {
      createDialog((resolve, reject) => (
        <div
          className={
            styles.dialog +
            (theme === 'dark'
              ? ' bg-headerDark text-fontDarker'
              : ' bg-commentsLight text-fontLighter')
          }
        >
          <section>
            <h4
              className={
                theme === 'dark' ? ' text-fontDark' : ' text-fontLight'
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
              className={
                'text-accent' +
                (theme === 'dark' ? ' bg-searchDark' : ' bg-searchLight')
              }
            >
              Oui
            </button>
            <button
              onClick={reject}
              className={
                theme === 'dark'
                  ? ' bg-searchDark text-fontDarker'
                  : ' bg-searchLight text-fontLighter'
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
        styles.title + (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
      }
    >
      <div>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <button
          onClick={createContactDialog}
          className={
            theme === 'dark'
              ? ' bg-searchDark text-fontDarker'
              : ' bg-commentsLight text-fontLighter'
          }
        >
          <h1 data-test='cliquezici'>Cliquez ici pour me contacter!</h1>
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
