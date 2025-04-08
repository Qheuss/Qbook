import styles from './Post.module.scss';
import { useAppSelector } from '@/redux/hooks';
import PostHeader from './PostHeader';
import PostActions from './PostActions';

interface PostProps {
  children?: React.ReactNode;
}

const Post = ({ children }: PostProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div
      className={
        styles.post + (theme === 'dark' ? ' bg-headerDark' : ' bg-headerLight')
      }
    >
      <PostHeader />
      <div className={styles.content}>{children && children}</div>
      <PostActions />
    </div>
  );
};

export default Post;
