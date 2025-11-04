import styles from './Post.module.scss';
import { useAppSelector } from '@/redux/hooks';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import { motion } from 'motion/react';

interface PostProps {
  children?: React.ReactNode;
  date?: string;
}

const Post = ({ children, date }: PostProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  const animations = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 },
    },
  };

  return (
    <motion.div
      className={
        styles.post + (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
      }
      variants={animations.container}
      initial='hidden'
      animate='show'
    >
      <motion.div variants={animations.item}>
        <PostHeader date={date} />
      </motion.div>
      <motion.div className={styles.content} variants={animations.item}>
        {children && children}
      </motion.div>
      <motion.div variants={animations.item}>
        <PostActions />
      </motion.div>
    </motion.div>
  );
};

export default Post;
