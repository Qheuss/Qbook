import { TbMessageCircle, TbShare3 } from 'react-icons/tb';
import styles from './PostActions.module.scss';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';

const PostActions = () => {
  const [likes, setLikes] = useState(0);
  const [shares, setShares] = useState(0);

  const theme = useAppSelector((state) => state.theme.theme);

  const { t } = useTranslation();

  return (
    <div className={styles.actions}>
      <div
        className={
          styles.likes +
          (theme === 'dark' ? ' text-fontDarker' : ' text-fontLighter')
        }
      >
        <div>
          <AiFillLike />
          <span>{likes}</span>
        </div>
        <div>
          <span>
            {0} {t('Post.comments')}
          </span>
          <span>
            {shares} {t('Post.shares')}
          </span>
        </div>
      </div>
      <hr />
      <div className={styles.buttons}>
        <button
          className={
            theme === 'dark'
              ? ' text-fontDarker hover:bg-iconsDark'
              : ' text-fontLighter hover:bg-iconsLight'
          }
          onClick={() => setLikes(likes + 1)}
        >
          <AiOutlineLike />
          <span>{t('Post.like')}</span>
        </button>
        <button
          className={
            theme === 'dark'
              ? ' text-fontDarker hover:bg-iconsDark'
              : ' text-fontLighter hover:bg-iconsLight'
          }
        >
          <TbMessageCircle />
          <span>{t('Post.comment')}</span>
        </button>
        <button
          className={
            theme === 'dark'
              ? ' text-fontDarker hover:bg-iconsDark'
              : ' text-fontLighter hover:bg-iconsLight'
          }
          onClick={async () => {
            setShares(shares + 1);
            if (navigator.share) {
              try {
                await navigator.share({
                  title: t('Post.shareAction.title'),
                  text: t('Post.shareAction.text'),
                  url: window.location.href,
                });
                console.log('Shared successfully!');
              } catch (error) {
                console.error('Error sharing:', error);
              }
            } else {
              alert(t('Post.shareAction.error'));
            }
          }}
        >
          <TbShare3 />
          <span>{t('Post.share')}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
