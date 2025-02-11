import Carousel from './Carousel';
import styles from './Feed.module.scss';
import Post from './Post';
import Title from './Title';
const Feed = () => {
  return (
    <main className={styles.quentin}>
      <Title />
      <Carousel />
      <Post
        text="Ayant récemment terminé la formation Junior Développeur chez BeCode et complété celui-ci par un stage enrichissant chez EVS Broadcast, je suis à la recherche d'une opportunité pour mettre à profit mes compétences dans un environnement professionnel. Éligible au dispositif PFI, je suis ponctuel, dévoué, à l’aise dans les environnements collaboratifs et impatient de contribuer à une équipe tout en continuant à développer mes compétences."
        images={['images/photocv.jpg']}
      />
      <Post
        text={`COMPÉTENCES TECH: React.js | Sass | Next.js | HTML | Figma | Linux | C# | CSS/SCSS | Vite | Git | Javascript/TypeScript | Jira`}
        images={['images/techskills.png']}
      />
    </main>
  );
};

export default Feed;
