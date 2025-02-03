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
            selectedPage === index ? 'text-[#54c078]' : 'text-neutral-400'
          }`}
        />
      </div>
    </li>
  );
};
