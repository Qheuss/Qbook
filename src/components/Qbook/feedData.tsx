import type { ReactNode } from 'react';
import { PostCard } from './PostCard';
import { getTextColor } from '@/utils/cn';

export interface PostData {
  date?: string;
  content: (t: (key: string) => string, theme: 'light' | 'dark') => ReactNode;
}

export const POSTS_DATA: PostData[] = [
  {
    date: '06/03/2026',
    content: (t, theme) => (
      <PostCard
        description='Starter.description1'
        link={{
          href: 'https://github.com/Qheuss/nextjs-prisma-betterauth-starter',
          label: 'github.com/Qheuss/nextjs-prisma-betterauth-starter',
          ariaLabel:
            'Next.js Starter with Better Auth & Prisma GitHub Repository',
        }}
        images={[
          'images/starter1.png',
          'images/starter2.png',
          'images/starter3.png',
          'images/starter4.png',
        ]}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    date: '03/09/2025',
    content: (t, theme) => (
      <PostCard
        description='YouteTube.description1'
        link={{
          href: 'https://github.com/Qheuss/youtube-clone',
          label: 'github.com/Qheuss/youtube-clone',
          ariaLabel: 'YouTube Clone GitHub Repository',
        }}
        images={[
          'images/YouteTube1.png',
          'images/YouteTube2.png',
          'images/YouteTube3.png',
          'images/YouteTube4.png',
        ]}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    date: '19/08/2025',
    content: (t, theme) => (
      <PostCard
        description='Toolbox.description1'
        link={{
          href: 'https://github.com/Qheuss/toolbox',
          label: 'github.com/Qheuss/toolbox',
          ariaLabel: 'Toolbox GitHub Repository',
        }}
        images={[
          'images/toolbox1.png',
          'images/toolbox2.png',
          'images/toolbox3.png',
          'images/toolbox4.png',
        ]}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    date: '07/08/2025',
    content: (t, theme) => (
      <PostCard
        items={[
          'Francorchamps.description1',
          'Francorchamps.description2',
          'Francorchamps.description3',
          'Francorchamps.description4',
        ]}
        link={{
          href: 'https://francorchamps.bike/',
          label: 'francorchamps.bike',
          ariaLabel: 'Francorchamps Bike Website',
        }}
        images={[
          'images/francorchamps1.png',
          'images/francorchamps2.png',
          'images/francorchamps3.png',
          'images/francorchamps4.png',
          'images/francorchamps5.png',
          'images/francorchamps6.png',
        ]}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    date: '30/07/2024',
    content: (t, theme) => (
      <PostCard
        description='Aviron.description'
        link={{
          href: 'https://www.aviron-uliege.be/',
          label: 'www.aviron-uliege.be',
          ariaLabel: 'Aviron ULiège Website',
        }}
        images={[
          'images/aviron1.png',
          'images/aviron2.png',
          'images/aviron3.png',
        ]}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    content: (t, theme) => (
      <PostCard
        description='Introduction.description'
        image={{
          src: 'images/QuentinHeusse.jpg',
          alt: 'Quentin Heusse Profile',
        }}
        t={t}
        theme={theme}
      />
    ),
  },
  {
    content: (t, theme) => (
      <p className={getTextColor(theme)}>
        <span className='font-semibold'>{t('Skills')}:</span> React.js | Next.js
        | HTML | Figma | Linux | C# | CSS/SCSS | Vite | Vitest/Jest | Git |
        Javascript/TypeScript | Jira | Tailwindcss | Tanstack/router
      </p>
    ),
  },
];
