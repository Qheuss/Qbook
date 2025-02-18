import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

interface SocialsProps {
  icon: React.ElementType;
  link: string;
  colorDark: string;
  colorLight: string;
  text: string;
}
const Socials = ({
  icon: Icon,
  link,
  colorDark,
  colorLight,
  text,
}: SocialsProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('Socials must be used within a ThemeProvider');
  }

  return (
    <li
      className={
        themeContext.theme === 'dark'
          ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
          : ' text-[#606367] hover:bg-[#e3e4e6]'
      }
      onClick={() => window.open(link)}
    >
      <Icon
        style={{
          color: themeContext.theme === 'dark' ? colorDark : colorLight,
        }}
      />
      {text}
    </li>
  );
};

export default Socials;
