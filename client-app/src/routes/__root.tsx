import '@/i18n/i18n';
import { createRootRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n/i18n';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});

function NotFound() {
  return Navigate({ to: '/notFound' });
}

function RootComponent() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLang = i18n.language.split('-')[0];
    const browserLanguage = navigator.language.split('-')[0];

    const preferredLanguage = currentLang || browserLanguage;

    const targetLang = SUPPORTED_LANGUAGES.includes(
      preferredLanguage as SupportedLanguage
    )
      ? preferredLanguage
      : 'fr';

    if (i18n.language !== targetLang) {
      i18n.changeLanguage(targetLang);
    }
  }, [i18n]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <TanStackRouterDevtools />  */}
    </>
  );
}
