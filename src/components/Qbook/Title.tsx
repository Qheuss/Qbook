import { useCallback } from 'react';
import { createDialog } from '../Dialog';
import styles from './Title.module.scss';
import Socials from './Socials';
import { useNavigate } from '@tanstack/react-router';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { cn, getBgColor, getTextColor } from '@/utils/cn';
import { SOCIAL_LINKS, PROFILE_IMAGE, PROFILE_NAME } from './constants';

const Title = () => {
  const navigate = useNavigate();
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const createContactDialog = useCallback(async () => {
    createDialog((resolve, reject) => (
      <div
        className={cn(
          styles.dialog,
          getBgColor(theme, 'comments'),
          getTextColor(theme, 'secondary'),
        )}
      >
        <section>
          <h4 className={getTextColor(theme, 'primary')}>
            {t('Title.dialog.title')}
          </h4>
          <p>{t('Title.dialog.description')}</p>
        </section>
        <div>
          <button
            onClick={resolve}
            className={cn('text-accent', getBgColor(theme, 'search'))}
          >
            {t('Title.dialog.yes')}
          </button>
          <button
            onClick={reject}
            className={cn(
              getBgColor(theme, 'search'),
              getTextColor(theme, 'secondary'),
            )}
          >
            {t('Title.dialog.no')}
          </button>
        </div>
      </div>
    )).then(
      () => {
        navigate({ to: '/contact' });
      },
      () => {},
    );
  }, [navigate, t, theme]);

  return (
    <div className={cn(styles.title, getBgColor(theme, 'header'))}>
      <div>
        <img src={PROFILE_IMAGE} alt={PROFILE_NAME} />
        <button
          onClick={createContactDialog}
          className={cn(
            theme === 'dark' ? 'bg-searchDark' : 'bg-commentsLight',
            getTextColor(theme, 'secondary'),
          )}
        >
          <h1 data-testid='cliquezici'>{t('Title.clickHere')}</h1>
        </button>
      </div>
      <div
        className={cn(
          styles.lineBreak,
          theme === 'dark' ? 'bg-[#ffffff13]' : 'bg-[#e2e2e2]',
        )}
      ></div>
      <ul>
        {SOCIAL_LINKS.map((item) => (
          <Socials key={item.text} {...item} />
        ))}
      </ul>
    </div>
  );
};

export default Title;
