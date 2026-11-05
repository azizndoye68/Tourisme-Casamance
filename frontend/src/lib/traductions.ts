import messagesFr from '../../traductions/francais.json';
import messagesEn from '../../traductions/anglais.json';

export async function getMessages(locale: string) {
  switch (locale) {
    case 'fr':
      return messagesFr;
    case 'en':
      return messagesEn;
    default:
      throw new Error(`Unsupported locale: ${locale}`);
  }
}