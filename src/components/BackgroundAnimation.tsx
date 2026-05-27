import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import {
  type Container,
  type Engine,
  type ISourceOptions,
} from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { useAppSelector } from '@/redux/hooks';

const particlesInit = async (engine: Engine): Promise<void> => {
  await loadSlim(engine);
};

const ParticleBackground = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  const particlesLoaded = async (container?: Container) => {
    if (!container) {
      console.log('Particles container failed to load or is not initialized.');
    }
  };

  const options = useMemo(() => {
    const backgroundDark = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--backgroundDark');

    const backgroundLight = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--backgroundLight');

    const colorDark = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--colorDark');

    const colorLight = getComputedStyle(
      document.documentElement,
    ).getPropertyValue('--colorLight');

    const darkOptions: ISourceOptions = {
      fpsLimit: 120,
      background: { color: { value: backgroundDark } },
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
        color: { value: colorDark },
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
      background: { color: { value: backgroundLight } },
      particles: {
        number: { density: { enable: true }, value: 80 },
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
        color: { value: colorLight },
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

    return theme === 'dark' ? darkOptions : lightOptions;
  }, [theme]);

  return (
    <div className='fixed inset-0 -z-10'>
      <ParticlesProvider init={particlesInit}>
        <Particles
          id='tsparticles'
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </ParticlesProvider>
    </div>
  );
};

export default ParticleBackground;
