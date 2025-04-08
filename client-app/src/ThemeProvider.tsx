import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';

const ThemeListener: React.FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return null;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Provider store={store}>
      <ThemeListener />
      {children}
    </Provider>
  );
};
