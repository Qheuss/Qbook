import { useAppSelector } from '@/redux/hooks';
import { cn, getHoverBg } from '@/utils/cn';
import type { SocialLink } from './constants';

const Socials = ({
  icon: Icon,
  link,
  colorDark,
  colorLight,
  text,
}: SocialLink) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const handleClick = () => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <li
      className={cn('text-accent', getHoverBg(theme))}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role='button'
      tabIndex={0}
      aria-label={`Visit ${text}`}
    >
      <Icon
        style={{
          color: theme === 'dark' ? colorDark : colorLight,
        }}
        aria-hidden='true'
      />
      {text}
    </li>
  );
};

export default Socials;
