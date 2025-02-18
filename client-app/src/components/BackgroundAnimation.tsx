import { useEffect, useMemo, useState, useContext } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { Engine, ISourceOptions, Container } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { ThemeContext } from '../context/ThemeContext';

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ParticleBackground must be used within a ThemeProvider');
  }

  const backgroundColor = themeContext.theme === 'dark' ? '#1c1c1d' : '#f2f4f7';

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container) => {
    if (!container) {
      console.log('Particles container failed to load or is not initialized.');
    }
  };

  const options = useMemo(() => {
    const darkOptions: ISourceOptions = {
      fpsLimit: 120,
      background: { color: { value: backgroundColor } },
      particles: {
        number: { density: { enable: true }, value: 80 },
        shape: { type: 'polygon' },
        size: { value: { min: 1, max: 3 } },
        opacity: {
          value: 0.5,
          animation: {
            enable: true,
            speed: 1.5,
          },
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'top',
          random: true,
          straight: false,
          outModes: 'out',
        },
        color: { value: '#fff' },
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'grab' },
        },
        modes: {
          push: { quantity: 4 },
          grab: {
            distance: 200,
            lineLinked: { opacity: 0.7 },
          },
        },
      },
      detectRetina: true,
    };

    const lightOptions: ISourceOptions = {
      fpsLimit: 120,
      background: { color: { value: backgroundColor } },
      particles: {
        number: { density: { enable: true }, value: 50 },
        size: { value: { min: 2, max: 4 } },
        opacity: {
          value: 0.7,
          animation: {
            enable: true,
            speed: 1.5,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: 'none',
          random: true,
          outModes: 'out',
        },
        color: { value: '#606367' },
      },
      interactivity: {
        events: {
          onClick: { enable: true, mode: 'push' },
          onHover: { enable: true, mode: 'bubble' },
        },
        modes: {
          push: { quantity: 4 },
          bubble: { distance: 200, size: 10, duration: 0.3, opacity: 0.8 },
        },
      },
      detectRetina: true,
    };

    return themeContext.theme === 'dark' ? darkOptions : lightOptions;
  }, [themeContext.theme, backgroundColor]);

  return init ? (
    <div className='fixed inset-0 -z-10'>
      <Particles
        id='tsparticles'
        particlesLoaded={particlesLoaded}
        options={options}
      />
    </div>
  ) : null;
};

export default ParticleBackground;
