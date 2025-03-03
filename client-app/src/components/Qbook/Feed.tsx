import Carousel from './Carousel';
import styles from './Feed.module.scss';
import Post from './Post';
import Title from './Title';

const Feed = () => {
  return (
    <main
      className={
        styles.quentin +
        ' mr-4 ml-4 mt-0 mb-0 md:mr-auto md:ml-auto md:w-[680px]'
      }
    >
      <Title />
      <Carousel />
      <Post
        text="Ayant récemment terminé la formation Junior Développeur chez BeCode et complété celui-ci par un stage enrichissant chez EVS Broadcast, je suis à la recherche d'une opportunité pour mettre à profit mes compétences dans un environnement professionnel. Éligible au dispositif PFI, je suis ponctuel, dévoué, à l’aise dans les environnements collaboratifs et impatient de contribuer à une équipe tout en continuant à développer mes compétences."
        images={['images/QuentinHeusse.jpg']}
      />
      <Post
        text={`COMPÉTENCES TECH: React.js | Next.js | HTML | Figma | Linux | C# | CSS/SCSS | Vite | Vitest/Jest | Git | Javascript/TypeScript | Jira | Tailwindcss | Tanstack`}
      />
    </main>
  );
};

export default Feed;
