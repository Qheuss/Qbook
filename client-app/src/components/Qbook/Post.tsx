import { useState } from 'react';
import styles from './Post.module.scss';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { TbMessageCircle } from 'react-icons/tb';
import { TbShare3 } from 'react-icons/tb';

interface PostProps {
  text: string;
  images: string[];
}

const Post = ({ text, images }: PostProps) => {
  const [likes, setLikes] = useState(0);
  const now = new Date();

  return (
    <div className={styles.post}>
      <div className={styles.me}>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <div>
          <h2>Quentin Heusse</h2>
          <h3>{now.toLocaleDateString()}</h3>
        </div>
      </div>
      <div className={styles.content}>
        <p>{text}</p>
        <div className={styles.images}>
          {images.length > 0 &&
            images.map((image, index) => (
              <img key={index} src={image} alt={`image ${index + 1}`} />
            ))}
        </div>
      </div>
      <div className={styles.actions}>
        <div className={styles.likes}>
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
          <button onClick={() => setLikes(likes + 1)}>
            <AiOutlineLike />
            Like
          </button>
          <button>
            <TbMessageCircle />
            Commenter
          </button>
          <button>
            <TbShare3 />
            Partager
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
