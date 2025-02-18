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
    throw new Error('NavItem must be used within a ThemeProvider');
  }

  return (
    <li
      className={`${
        selectedPage === index ? 'border-[#54c078] border-b-2' : ''
      }`}
    >
      <div
        className={
          themeContext.theme === 'dark'
            ? ' hover:bg-[#4f5152]'
            : ' hover:bg-[#e3e4e6]'
        }
        style={{ backgroundColor: selectedPage === index ? 'transparent' : '' }}
        onClick={() => navigate(path)}
      >
        <Icon
          className={`text-2xl ${
            selectedPage === index
              ? 'text-[#54c078]'
              : themeContext.theme === 'dark'
              ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
              : ' text-[#606367] hover:bg-[#e3e4e6]'
          }
          }`}
        />
      </div>
    </li>
  );
};
