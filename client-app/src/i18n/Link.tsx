import { Link as RouterLink } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

// Define the props interface for our component
interface I18nLinkProps {
  to: string;
  children: ReactNode;
  // Include any other props you might need
  className?: string;
  style?: React.CSSProperties;
}

export const Link = ({ to, children, ...props }: I18nLinkProps) => {
  const { i18n } = useTranslation();

  // Add the language parameter to the URL
  let linkTo = to;

  // Create a URL object to handle query parameters
  const url = new URL(to, window.location.origin);
  url.searchParams.set('lang', i18n.language);
  linkTo = `${url.pathname}${url.search}`;

  return (
    <RouterLink to={linkTo} {...props}>
      {children}
    </RouterLink>
  );
};
