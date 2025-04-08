import { Link as RouterLink } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface I18nLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Link = ({ to, children, ...props }: I18nLinkProps) => {
  const { i18n } = useTranslation();

  let linkTo = to;

  const url = new URL(to, window.location.origin);
  url.searchParams.set('lang', i18n.language);
  linkTo = `${url.pathname}${url.search}`;

  return (
    <RouterLink to={linkTo} {...props}>
      {children}
    </RouterLink>
  );
};
