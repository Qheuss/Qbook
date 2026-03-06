import type { ReactNode } from 'react';

export interface PostData {
  date?: string;
  content: (t: (key: string) => string, theme: 'light' | 'dark') => ReactNode;
}

export const POSTS_DATA: PostData[] = [
  {
    date: '03/09/2025',
    content: (t, theme) => (
      <>
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
          rel='noopener noreferrer'
          href='https://github.com/Qheuss/youtube-clone'
        >
          github.com/Qheuss/youtube-clone
        </a>
        <section>
          <img src='images/YouteTube1.png' alt='Youte Tube' />
        </section>
      </>
    ),
  },
  {
    date: '19/08/2025',
    content: (t, theme) => (
      <>
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
          rel='noopener noreferrer'
          href='https://github.com/Qheuss/toolbox'
        >
          github.com/Qheuss/toolbox
        </a>
        <section>
          <img src='images/toolbox1.png' alt='toolbox' />
        </section>
      </>
    ),
  },
  {
    date: '07/08/2025',
    content: (t, theme) => (
      <>
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
          rel='noopener noreferrer'
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
      </>
    ),
  },
  {
    date: '30/07/2024',
    content: (t, theme) => (
      <>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Aviron.description')}
        </p>
        <a
          className='text-accent'
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.aviron-uliege.be/'
        >
          www.aviron-uliege.be
        </a>
        <section>
          <img src='images/aviron1.png' alt='aviron' />
        </section>
      </>
    ),
  },
  {
    content: (t, theme) => (
      <>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {t('Introduction.description')}
        </p>
        <section>
          <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        </section>
      </>
    ),
  },
  {
    content: (t, theme) => (
      <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
        {t('Skills')}: React.js | Next.js | HTML | Figma | Linux | C# | CSS/SCSS
        | Vite | Vitest/Jest | Git | Javascript/TypeScript | Jira | Tailwindcss
        | Tanstack/router
      </p>
    ),
  },
];
