import { useAppSelector } from '@/redux/hooks';
import styles from './PostHeader.module.scss';
import { getTextColor } from '@/utils/cn';
import { PROFILE_IMAGE, PROFILE_NAME } from '../constants';

interface PostHeaderProps {
  date?: string;
}

const PostHeader = ({ date }: PostHeaderProps) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const displayDate = date ?? new Date().toLocaleDateString('en-GB');

  return (
    <div className={styles.me}>
      <img src={PROFILE_IMAGE} alt={PROFILE_NAME} />
      <div>
        <h2 className={getTextColor(theme, 'primary')}>{PROFILE_NAME}</h2>
        <h3 className={getTextColor(theme, 'secondary')}>{displayDate}</h3>
      </div>
    </div>
  );
};

export default PostHeader;
