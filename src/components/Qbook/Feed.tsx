import { useAppSelector } from '@/redux/hooks';
import Carousel from './Carousel';
import Post from './Post/Post';
import Title from './Title';
import { useTranslation } from 'react-i18next';
import { POSTS_DATA } from './feedData';

const Feed = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { t } = useTranslation();

  return (
    <main className='md:mt-18.75 md:mb-3.75 md:mx-auto md:w-feed mt-4 mb-0 mx-1'>
      <Title />
      <Carousel />
      {POSTS_DATA.map((post, index) => (
        <Post key={`post-${post.date ?? index}`} date={post.date}>
          {post.content(t, theme)}
        </Post>
      ))}
    </main>
  );
};

export default Feed;
