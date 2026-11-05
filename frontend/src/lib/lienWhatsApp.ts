export function getWhatsAppUrl(phone: string | null | undefined, message: string): string | null {
  const number = phone?.replace(/\D/g, '');
  if (!number) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
