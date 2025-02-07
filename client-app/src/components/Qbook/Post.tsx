import { useContext, useState } from 'react';
import styles from './Post.module.scss';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { TbMessageCircle } from 'react-icons/tb';
import { TbShare3 } from 'react-icons/tb';
import { ThemeContext } from '../../context/ThemeContext';

interface PostProps {
  text: string;
  images: string[];
}

const Post = ({ text, images }: PostProps) => {
  const [likes, setLikes] = useState(0);
  const now = new Date();

  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  return (
    <div
      className={
        styles.post +
        (themeContext.theme === 'dark' ? ' bg-[#252728]' : ' bg-[#f0f2f5]')
      }
    >
      <div className={styles.me}>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <div>
          <h2
            className={
              themeContext.theme === 'dark'
                ? 'text-[#e2e5e9]'
                : 'text-[#080809]'
            }
          >
            Quentin Heusse
          </h2>
          <h3
            className={
              themeContext.theme === 'dark'
                ? 'text-[#a6a9ac]'
                : 'text-[#606367]'
            }
          >
            {now.toLocaleDateString()}
          </h3>
        </div>
      </div>
      <div className={styles.content}>
        <p
          className={
            themeContext.theme === 'dark' ? 'text-[#e2e5e9]' : 'text-[#080809]'
          }
        >
          {text}
        </p>
        <div className={styles.images}>
          {images.length > 0 &&
            images.map((image, index) => (
              <img key={index} src={image} alt={`image ${index + 1}`} />
            ))}
        </div>
      </div>
      <div className={styles.actions}>
        <div
          className={
            styles.likes +
            (themeContext.theme === 'dark'
              ? ' text-[#a6a9ac]'
              : ' text-[#606367]')
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
              themeContext.theme === 'dark'
                ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
                : ' text-[#606367] hover:bg-[#e3e4e6]'
            }
            onClick={() => setLikes(likes + 1)}
          >
            <AiOutlineLike />
            Like
          </button>
          <button
            className={
              themeContext.theme === 'dark'
                ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
                : ' text-[#606367] hover:bg-[#e3e4e6]'
            }
          >
            <TbMessageCircle />
            Commenter
          </button>
          <button
            className={
              themeContext.theme === 'dark'
                ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
                : ' text-[#606367] hover:bg-[#e3e4e6]'
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
