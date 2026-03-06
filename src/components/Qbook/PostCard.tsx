import type { ReactNode } from 'react';
import { getTextColor } from '@/utils/cn';
import Carousel from './Carousel';

interface PostCardProps {
  items?: string[];
  description?: string;
  link?: {
    href: string;
    label: string;
    ariaLabel: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  images?: string[];
  t: (key: string) => string;
  theme: 'light' | 'dark';
}

const POST_LINK_CLASSES = 'text-accent hover:underline transition-all';
const POST_SECTION_CLASSES = 'mt-4';
const POST_IMAGE_CLASSES = 'w-full rounded-lg';

export function PostCard({
  items,
  description,
  link,
  image,
  images,
  t,
  theme,
}: PostCardProps): ReactNode {
  return (
    <>
      {items && items.length > 0 && (
        <ul className='space-y-2'>
          {items.map((item) => (
            <li key={item}>
              <p className={getTextColor(theme)}>{t(`${item}`)}</p>
            </li>
          ))}
        </ul>
      )}

      {description && !items && (
        <p className={getTextColor(theme)}>{t(description)}</p>
      )}

      {link && (
        <a
          className={POST_LINK_CLASSES}
          target='_blank'
          rel='noopener noreferrer'
          href={link.href}
          aria-label={link.ariaLabel}
        >
          {link.label}
        </a>
      )}

      {images && images.length > 0 && (
        <section className={POST_SECTION_CLASSES}>
          <Carousel images={images} singleImage />
        </section>
      )}

      {image && !images && (
        <section className={POST_SECTION_CLASSES}>
          <img src={image.src} alt={image.alt} className={POST_IMAGE_CLASSES} />
        </section>
      )}
    </>
  );
}
