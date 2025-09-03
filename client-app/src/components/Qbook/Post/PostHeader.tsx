import { useAppSelector } from '@/redux/hooks';
import styles from './PostHeader.module.scss';

interface PostHeaderProps {
  date?: string;
}

const PostHeader = ({ date }: PostHeaderProps) => {
  const now = new Date();

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <div className={styles.me}>
      <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
      <div>
        <h2 className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          Quentin Heusse
        </h2>
        <h3
          className={theme === 'dark' ? 'text-fontDarker' : 'text-fontLighter'}
        >
          {date ? date : now.toLocaleDateString('en-GB')}
        </h3>
      </div>
    </div>
  );
};

export default PostHeader;
