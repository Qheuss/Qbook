import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface NavItemProps {
  icon: React.ElementType;
  path: string;
  index: number;
  selectedPage: number;
  navigate: (path: string) => void;
}

export const NavItem = ({
  icon: Icon,
  path,
  index,
  selectedPage,
  navigate,
}: NavItemProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('ThemeToggle must be used within a ThemeProvider');
  }

  return (
    <li
      className={`${
        selectedPage === index ? 'border-[#54c078] border-b-2' : ''
      }`}
    >
      <div
        style={{ backgroundColor: selectedPage === index ? 'transparent' : '' }}
        onClick={() => navigate(path)}
      >
        <Icon
          className={`text-2xl ${
            selectedPage === index
              ? 'text-[#54c078]'
              : themeContext.theme === 'dark'
              ? ' text-[#a6a9ac]'
              : ' text-[#606367]'
          }
          }`}
        />
      </div>
    </li>
  );
};
