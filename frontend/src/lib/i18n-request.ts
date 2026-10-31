import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, isValidLocale } from './i18n';

export default getRequestConfig(async ({ locale }) => {
  const validatedLocale = isValidLocale(locale) ? locale : defaultLocale;

  return {
    locale: validatedLocale,
    messages: (await import(`../../messages/${validatedLocale}.json`)).default,
    timeZone: 'Africa/Dakar',
    now: new Date(),
  };
});