import { Link } from '@tanstack/react-router';
import styles from './NavItem.module.scss';
import { useAppSelector } from '@/redux/hooks';
import { cn, getHoverBg, getTextColor } from '@/utils/cn';

interface NavItemProps {
  icon: React.ElementType;
  path: string;
  selected: boolean;
}

export const NavItem = ({ icon: Icon, path, selected }: NavItemProps) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <li className={cn(styles.navItem, selected && 'border-accent border-b-2')}>
      <Link
        className={cn(getHoverBg(theme), 'h-12 md:h-12.5')}
        style={{ backgroundColor: selected ? 'transparent' : '' }}
        to={path}
      >
        <Icon
          className={cn(
            'text-2xl',
            selected
              ? 'text-accent'
              : cn(getTextColor(theme, 'secondary'), getHoverBg(theme)),
          )}
        />
      </Link>
    </li>
  );
};
