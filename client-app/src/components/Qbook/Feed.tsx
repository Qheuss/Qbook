import { useAppSelector } from '@/redux/hooks';
import Carousel from './Carousel';
import Post from './Post/Post';
import Title from './Title';
import { useTranslation } from 'react-i18next';

const Feed = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const { t } = useTranslation();

  return (
    <main
      className={
        ' md:mt-[75px] md:mb-[15px] md:mx-auto md:w-[680px] mt-4 mb-0 mx-1'
      }
    >
      <Title />
      <Carousel />

      <Post>
        <ul>
          <li>
            <a
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
              target='_blank'
              href='https://www.aviron-uliege.be/'
            >
              https://www.aviron-uliege.be/
            </a>
          </li>
          <li>
            <a
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
              target='_blank'
              href='https://velo-francorchamps.vercel.app/'
            >
              https://velo-francorchamps.vercel.app/
            </a>
          </li>
        </ul>
      </Post>

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Introduction.description')}
        </p>
        <br />
        <p
          className={
            theme === 'dark' ? 'text-fontDark' : 'text-fontLight' + ' font-bold'
          }
        >
          {t('Introduction.help')}
        </p>
        <section>
          <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        </section>
      </Post>

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Skills')}: React.js | Next.js | HTML | Figma | Linux | C# |
          CSS/SCSS | Vite | Vitest/Jest | Git | Javascript/TypeScript | Jira |
          Tailwindcss | Tanstack/router
        </p>
      </Post>
    </main>
  );
};

export default Feed;
