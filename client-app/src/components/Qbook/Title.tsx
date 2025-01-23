import { useMemo } from 'react';
import { createDialog } from '../Dialog';
import styles from './Title.module.scss';
import { useNavigate } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const Title = () => {
  const navigate = useNavigate();

  const contact = useMemo(() => {
    return async () => {
      createDialog((resolve, reject) => (
        <>
          <section>
            <h4>Me contacter</h4>
            <p>
              Souhaitez-vous me contacter? Je vous répondrai dans les plus brefs
              délais.
            </p>
          </section>
          <div>
            <button onClick={resolve} style={{ color: '#54c078' }}>
              Oui
            </button>
            <button onClick={reject}>Non</button>
          </div>
        </>
      )).then(
        async () => {
          navigate('/leaveamessage');
        },
        () => {}
      );
    };
  }, [navigate]);

  return (
    <div className={styles.title}>
      <div>
        <img src='images/QuentinHeusse.jpg' alt='Quentin Heusse' />
        <h1 onClick={contact}>Portfolio de Quentin Heusse</h1>
      </div>
      <div className={styles.lineBreak}></div>
      <ul>
        <li
          onClick={() =>
            window.open('https://www.linkedin.com/in/quentin-heusse')
          }
        >
          <FaLinkedin className={styles.linkedin} />
          Linkedin
        </li>
        <li onClick={() => window.open('https://github.com/Qheuss')}>
          <FaGithub className={styles.github} />
          Github
        </li>
      </ul>
    </div>
  );
};

export default Title;
