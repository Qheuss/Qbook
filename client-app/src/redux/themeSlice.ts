import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
  theme: 'light' | 'dark';
}

const getInitialState = (): ThemeState => {
  if (typeof window !== 'undefined') {
    return {
      theme: (localStorage.getItem('theme') as 'light' | 'dark') || 'dark',
    };
  }
  return { theme: 'dark' };
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: getInitialState(),
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
      }
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
