import { Link } from '@tanstack/react-router';
import styles from './NavItem.module.scss';
import { useAppSelector } from '../../redux/hooks';

interface NavItemProps {
  icon: React.ElementType;
  path: string;
  selected: boolean;
}

export const NavItem = ({ icon: Icon, path, selected }: NavItemProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <li
      className={
        styles.navItem + `${selected ? ' border-[#54c078] border-b-2' : ''}`
      }
    >
      <Link
        className={
          theme === 'dark'
            ? ' hover:bg-[#4f5152] h-12 md:h-[50px]'
            : ' hover:bg-[#e3e4e6] h-12 md:h-[50px]'
        }
        style={{ backgroundColor: selected ? 'transparent' : '' }}
        to={path}
      >
        <Icon
          className={`text-2xl ${
            selected
              ? 'text-[#54c078]'
              : theme === 'dark'
              ? 'text-[#a6a9ac] hover:bg-[#4f5152]'
              : 'text-[#606367] hover:bg-[#e3e4e6]'
          }
          }`}
        />
      </Link>
    </li>
  );
};
