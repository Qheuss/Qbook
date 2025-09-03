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
      <Post date='9/03/2025'>
        <ul>
          <li>
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('YouteTube.description1')}
            </p>
          </li>
        </ul>
        <a
          className='text-accent'
          target='_blank'
          href='https://github.com/Qheuss/youtube-clone'
        >
          github.com/Qheuss/youtube-clone
        </a>
        <section>
          <img src='images/YouteTube1.png' alt='Youte Tube' />
        </section>
      </Post>
      <Post date='8/19/2025'>
        <ul>
          <li>
            <p
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
            >
              {t('Toolbox.description1')}
            </p>
          </li>
        </ul>
        <a
          className='text-accent'
          target='_blank'
          href='https://github.com/Qheuss/toolbox'
        >
          github.com/Qheuss/toolbox
        </a>
        <section>
          <img src='images/toolbox1.png' alt='toolbox' />
        </section>
      </Post>
      <Post date='8/7/2025'>
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
          className='text-accent'
          target='_blank'
          href='https://francorchamps.bike/'
        >
          francorchamps.bike
        </a>
        <section>
          <img
            src='images/Fun&WorkBikeFrancorchamps.png'
            alt='WorkBikeFrancorchamps'
          />
        </section>
      </Post>
      <Post date='7/30/2024'>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Aviron.description')}
        </p>
        <a
          className={'text-accent'}
          target='_blank'
          href='https://www.aviron-uliege.be/'
        >
          www.aviron-uliege.be
        </a>
        <section>
          <img src='images/aviron1.png' alt='aviron' />
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
