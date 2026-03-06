import { FaLinkedin, FaGithub } from 'react-icons/fa';
import type { IconType } from 'react-icons';

export interface SocialLink {
  icon: IconType;
  link: string;
  colorDark: string;
  colorLight: string;
  text: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    icon: FaLinkedin,
    link: 'https://www.linkedin.com/in/quentin-heusse',
    colorDark: '#0a66c2',
    colorLight: '#0a66c2',
    text: 'Linkedin',
  },
  {
    icon: FaGithub,
    link: 'https://github.com/Qheuss',
    colorDark: '#fff',
    colorLight: '#000',
    text: 'Github',
  },
];

export const CAROUSEL_IMAGES: string[] = [
  'images/starter1.png',
  'images/starter2.png',
  'images/starter3.png',
  'images/starter4.png',
  'images/YouteTube1.png',
  'images/YouteTube2.png',
  'images/YouteTube3.png',
  'images/YouteTube4.png',
  'images/toolbox1.png',
  'images/toolbox2.png',
  'images/toolbox3.png',
  'images/toolbox4.png',
  'images/francorchamps1.png',
  'images/francorchamps2.png',
  'images/francorchamps3.png',
  'images/francorchamps4.png',
  'images/francorchamps5.png',
  'images/francorchamps6.png',
  'images/aviron1.png',
  'images/aviron2.png',
  'images/aviron3.png',
  'images/clickerlogin.png',
  'images/clickermoney.png',
  'images/weather.png',
];

export const PROFILE_IMAGE = 'images/QuentinHeusse.jpg';
export const PROFILE_NAME = 'Quentin Heusse';

export const SCROLL_AMOUNT = 200;
