import { TbMessageCircle, TbShare3 } from 'react-icons/tb';
import styles from './PostActions.module.scss';
import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useState } from 'react';
import { useAppSelector } from '../../../redux/hooks';

const PostActions = () => {
  const [likes, setLikes] = useState(0);

  const theme = useAppSelector((state) => state.theme.theme);

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
          <span>{0} commentaires</span>
          <span>{0} partages</span>
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
          Like
        </button>
        <button
          className={
            theme === 'dark'
              ? ' text-fontDarker hover:bg-iconsDark'
              : ' text-fontLighter hover:bg-iconsLight'
          }
        >
          <TbMessageCircle />
          Commenter
        </button>
        <button
          className={
            theme === 'dark'
              ? ' text-fontDarker hover:bg-iconsDark'
              : ' text-fontLighter hover:bg-iconsLight'
          }
          onClick={async () => {
            if (navigator.share) {
              try {
                await navigator.share({
                  title: 'Partagez mon site web!',
                  text: "N'hésitez pas à partager mon site web autour de vous!",
                  url: window.location.href,
                });
                console.log('Shared successfully!');
              } catch (error) {
                console.error('Error sharing:', error);
              }
            } else {
              alert('Votre navigateur ne supporte pas la fonction "share"');
            }
          }}
        >
          <TbShare3 />
          Partager
        </button>
      </div>
    </div>
  );
};

export default PostActions;
