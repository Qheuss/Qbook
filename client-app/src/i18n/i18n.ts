import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import frTranslation from './locales/fr.json';

export const SUPPORTED_LANGUAGES = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export function isSupportedLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang', // ?lang=fr in URLs
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const changeLanguage = (lng: string) => {
  if (lng === i18n.language) return;

  i18n.changeLanguage(lng);
  localStorage.setItem('preferredLanguage', lng);

  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set('lang', lng);
  window.history.replaceState({}, '', newUrl);
};

export const getCurrentLanguage = () => {
  return i18n.language || i18n.options.fallbackLng;
};
