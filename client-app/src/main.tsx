import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { ThemeProvider } from './ThemeProvider';
import BackgroundAnimation from './components/BackgroundAnimation';

import './global.css';
import '../index.scss';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

window.addEventListener('unload', () => window.scrollTo(0, 0));

const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider>
        <BackgroundAnimation />
        <RouterProvider router={router} />
      </ThemeProvider>
    </StrictMode>
  );
}
