import messagesFr from '../../messages/fr.json';
import messagesEn from '../../messages/en.json';

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