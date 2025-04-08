import '@/i18n/i18n';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES, SupportedLanguage } from '@/i18n/i18n';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');

    if (
      langParam &&
      SUPPORTED_LANGUAGES.includes(langParam as SupportedLanguage)
    ) {
      if (i18n.language !== langParam) {
        i18n.changeLanguage(langParam);
        localStorage.setItem('preferredLanguage', langParam);
      }
    } else {
      const preferredLanguage =
        localStorage.getItem('preferredLanguage') ||
        navigator.language.split('-')[0];

      const targetLang = SUPPORTED_LANGUAGES.includes(
        preferredLanguage as SupportedLanguage
      )
        ? preferredLanguage
        : 'fr';

      if (i18n.language !== targetLang) {
        i18n.changeLanguage(targetLang);
      }

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('lang', targetLang);
      window.history.replaceState({}, '', newUrl);
    }
  }, [i18n, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      {/* <TanStackRouterDevtools />  */}
    </>
  );
}
