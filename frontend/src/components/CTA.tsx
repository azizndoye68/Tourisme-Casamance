'use client';

import { Mail, MessageCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface CTAData {
  title: string;
  subtitle: string;
  whatsappText: string;
}

interface CTAProps {
  data: CTAData;
}

export function CTA({ data }: CTAProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = useTranslations('common');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section className="section bg-forest text-cream" aria-labelledby="cta-title">
      <div className="container-main">
        <div className="card bg-forest/50 border border-forest/20 p-8 md:p-16 max-w-4xl mx-auto text-center">
          <h2 id="cta-title" className="section-title text-cream mb-4">
            {data.title}
          </h2>
          <p className="text-mint text-body-lg mb-10 max-w-xl mx-auto">
            {data.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto" noValidate>
              <label htmlName="newsletter-email" className="sr-only">
                {t.newsletter}
              </label>
              <input
                type="email"
                name="newsletter-email"
                id="newsletter-email"
                className="input-field flex-1"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
                aria-describedby="newsletter-status"
              />
              <button
                type="submit"
                className="btn-primary whitespace-nowrap"
                disabled={status === 'loading' || status === 'success' || !email}
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </>
                ) : status === 'success' ? (
                  'Inscrit !'
                ) : (
                  <>
                    <Mail className="w-5 h-5" aria-hidden="true" />
                    {t.submit}
                  </>
                )}
              </button>
              <div id="newsletter-status" aria-live="polite" className="sr-only">
                {status === 'success' && 'Inscription réussie'}
                {status === 'error' && 'Erreur lors de l\'inscription'}
              </div>
            </form>
            <a
              href="https://wa.me/221770000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp whitespace-nowrap group"
              aria-label={data.whatsappText}
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              {data.whatsappText}
            </a>
          </div>
          <p className="mt-6 text-caption text-muted">
            Pas de spam, juste l'essentiel. Désinscription en 1 clic.
          </p>
        </div>
      </div>
    </section>
  );
}