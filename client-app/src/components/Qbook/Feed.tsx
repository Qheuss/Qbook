import { useAppSelector } from '../../redux/hooks';
import Carousel from './Carousel';
import Post from './Post/Post';
import Title from './Title';

const Feed = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <main
      className={
        ' md:mt-[75px] md:mb-[15px] md:mx-auto md:w-[680px] mt-4 mb-0 mx-1'
      }
    >
      <Title />
      <Carousel />

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          Réalisations:
        </p>
        <ul>
          <li>
            <a
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
              target='_blank'
              href='https://www.aviron-uliege.be/'
            >
              https://www.aviron-uliege.be/
            </a>
          </li>
          <li>
            <a
              className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}
              target='_blank'
              href='https://velo-francorchamps.vercel.app/'
            >
              https://velo-francorchamps.vercel.app/ (en cours de développement)
            </a>
          </li>
        </ul>
      </Post>

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          Ayant récemment terminé la formation Junior Développeur chez BeCode et
          complété celui-ci par un stage enrichissant chez EVS Broadcast, je
          suis à la recherche d&apos;une opportunité pour mettre à profit mes
          compétences dans un environnement professionnel. Éligible au
          dispositif PFI, je suis ponctuel, dévoué, à l&apos;aise dans les
          environnements collaboratifs et impatient de contribuer à une équipe
          tout en continuant à développer mes compétences.
        </p>
        <section>
          <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        </section>
      </Post>

      <Post>
        <p className={theme === 'dark' ? 'text-fontDark' : 'text-fontLight'}>
          COMPÉTENCES TECH: React.js | Next.js | HTML | Figma | Linux | C# |
          CSS/SCSS | Vite | Vitest/Jest | Git | Javascript/TypeScript | Jira |
          Tailwindcss | Tanstack/router
        </p>
      </Post>
    </main>
  );
};

export default Feed;
