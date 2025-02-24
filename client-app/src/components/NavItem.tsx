import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from '@tanstack/react-router';

interface NavItemProps {
  icon: React.ElementType;
  path: string;
  selected: boolean;
}

export const NavItem = ({ icon: Icon, path, selected }: NavItemProps) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('NavItem must be used within a ThemeProvider');
  }

  return (
    <li className={`${selected ? 'border-[#54c078] border-b-2' : ''}`}>
      <Link
        className={
          themeContext.theme === 'dark'
            ? ' hover:bg-[#4f5152]'
            : ' hover:bg-[#e3e4e6]'
        }
        style={{ backgroundColor: selected ? 'transparent' : '' }}
        to={path}
      >
        <Icon
          className={`text-2xl ${
            selected
              ? 'text-[#54c078]'
              : themeContext.theme === 'dark'
              ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
              : ' text-[#606367] hover:bg-[#e3e4e6]'
          }
          }`}
        />
      </Link>
    </li>
  );
};
