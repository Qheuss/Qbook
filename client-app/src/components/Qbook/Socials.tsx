import { useAppSelector } from '../../redux/hooks';

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
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <li
      className={
        theme === 'dark'
          ? ' text-[#a6a9ac] hover:bg-[#4f5152]'
          : ' text-[#606367] hover:bg-[#e3e4e6]'
      }
      onClick={() => window.open(link)}
    >
      <Icon
        style={{
          color: theme === 'dark' ? colorDark : colorLight,
        }}
      />
      {text}
    </li>
  );
};

export default Socials;
