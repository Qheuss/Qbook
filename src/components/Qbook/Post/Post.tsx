import styles from './Post.module.scss';
import { useAppSelector } from '@/redux/hooks';
import PostHeader from './PostHeader';
import PostActions from './PostActions';
import { motion, type Variants } from 'motion/react';
import { cn, getBgColor } from '@/utils/cn';

interface PostProps {
  children?: React.ReactNode;
  date?: string;
}

const animations: { container: Variants; item: Variants } = {
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

const Post = ({ children, date }: PostProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <motion.article
      className={cn(styles.post, getBgColor(theme, 'header'))}
      variants={animations.container}
      initial='hidden'
      animate='show'
    >
      <motion.div variants={animations.item}>
        <PostHeader date={date} />
      </motion.div>
      {children && (
        <motion.div className={styles.content} variants={animations.item}>
          {children}
        </motion.div>
      )}
      <motion.div variants={animations.item}>
        <PostActions />
      </motion.div>
    </motion.article>
  );
};

export default Post;
