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
        styles.navItem + `${selected ? ' border-accent border-b-2' : ''}`
      }
    >
      <Link
        className={
          theme === 'dark'
            ? ' hover:bg-iconsDark h-12 md:h-[50px]'
            : ' hover:bg-iconsLight h-12 md:h-[50px]'
        }
        style={{ backgroundColor: selected ? 'transparent' : '' }}
        to={path}
      >
        <Icon
          className={`text-2xl ${
            selected
              ? 'text-accent'
              : theme === 'dark'
              ? 'text-fontDarker hover:bg-iconsDark'
              : 'text-fontLighter hover:bg-iconsLight'
          }
          }`}
        />
      </Link>
    </li>
  );
};
