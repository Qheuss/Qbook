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
        image={{
          src: 'images/starter2.png',
          alt: 'Next.js Starter with Better Auth & Prisma',
        }}
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
        image={{
          src: 'images/YouteTube1.png',
          alt: 'YouTube Clone Project',
        }}
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
        image={{
          src: 'images/toolbox1.png',
          alt: 'Toolbox Project',
        }}
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
        image={{
          src: 'images/Fun&WorkBikeFrancorchamps.png',
          alt: 'Francorchamps Bike Project',
        }}
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
        image={{
          src: 'images/aviron1.png',
          alt: 'Aviron Project',
        }}
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
