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
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Francorchamps.description1')}
            </p>
          </li>
          <li>
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Francorchamps.description2')}
            </p>
          </li>
          <li>
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Francorchamps.description3')}
            </p>
          </li>
          <li>
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Francorchamps.description4')}
            </p>
          </li>
        </ul>
        <a
          className={'text-accent'}
          target="_blank"
          href="https://francorchamps.bike/"
        >
          francorchamps.bike
        </a>
        <section>
          <img src="images/Fun&WorkBikeFrancorchamps.png" alt="aviron" />
        </section>
      </Post>

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Aviron.description')}
        </p>
        <a
          className={'text-accent'}
          target="_blank"
          href="https://www.aviron-uliege.be/"
        >
          www.aviron-uliege.be
        </a>
        <section>
          <img src="images/aviron1.png" alt="aviron" />
        </section>
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
          <img src="images/QuentinHeusse.jpg" alt="Quentin Heusse" />
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
