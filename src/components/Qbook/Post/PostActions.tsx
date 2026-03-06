import { TbMessageCircle, TbShare3 } from 'react-icons/tb';
import styles from './PostActions.module.scss';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { useTranslation } from 'react-i18next';
import { cn, getTextColor, getHoverBg } from '@/utils/cn';

const generateRandomCount = () => Math.floor(Math.random() * 1001);

const PostActions = () => {
  const [likes, setLikes] = useState(generateRandomCount);
  const [shares, setShares] = useState(generateRandomCount);
  const [comments] = useState(generateRandomCount);

  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  const handleShare = async () => {
    setShares(shares + 1);
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('Post.shareAction.title'),
          text: t('Post.shareAction.text'),
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert(t('Post.shareAction.error'));
    }
  };

  const buttonClassName = cn(
    getTextColor(theme, 'secondary'),
    getHoverBg(theme),
  );

  return (
    <div className={styles.actions}>
      <div className={cn(styles.likes, getTextColor(theme, 'secondary'))}>
        <div>
          <AiFillLike />
          <span>{likes}</span>
        </div>
        <div>
          <span>
            {comments} {t('Post.comments')}
          </span>
          <span>
            {shares} {t('Post.shares')}
          </span>
        </div>
      </div>
      <hr />
      <div className={styles.buttons}>
        <button
          className={buttonClassName}
          onClick={() => setLikes(likes + 1)}
          aria-label={t('Post.like')}
        >
          <AiOutlineLike />
          <span>{t('Post.like')}</span>
        </button>
        <button className={buttonClassName} aria-label={t('Post.comment')}>
          <TbMessageCircle />
          <span>{t('Post.comment')}</span>
        </button>
        <button
          className={buttonClassName}
          onClick={handleShare}
          aria-label={t('Post.share')}
        >
          <TbShare3 />
          <span>{t('Post.share')}</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
