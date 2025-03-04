import { useState } from 'react';
import styles from './Post.module.scss';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { TbMessageCircle } from 'react-icons/tb';
import { TbShare3 } from 'react-icons/tb';
import { useAppSelector } from '../../redux/hooks';

interface PostProps {
  text: string;
  images?: string[];
}

const Post = ({ text, images }: PostProps) => {
  const [likes, setLikes] = useState(0);
  const now = new Date();

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div
      className={
        styles.post + (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
      }
    >
      <div className={styles.me}>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <div>
          <h2 className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
            Quentin Heusse
          </h2>
          <h3
            className={
              theme === 'dark' ? 'text-fontDarker' : 'text-fontLighter'
            }
          >
            {now.toLocaleDateString()}
          </h3>
        </div>
      </div>
      <div className={styles.content}>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          {text}
        </p>
        {images && (
          <div className={styles.images}>
            {images.length > 0 &&
              images.map((image, index) => (
                <img key={index} src={image} alt={`image ${index + 1}`} />
              ))}
          </div>
        )}
      </div>
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
          >
            <TbShare3 />
            Partager
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
