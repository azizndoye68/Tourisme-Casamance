'use client';

import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialData {
  quote: string;
  author: string;
  country: string;
}

interface TestimonialProps {
  data: TestimonialData;
}

export function Testimonial({ data }: TestimonialProps) {
  return (
    <section className="section bg-lime" aria-labelledby="testimonial-title">
      <div className="container-main">
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-emerald/20" aria-hidden="true">
            <Quote className="w-16 h-16" />
          </div>
          <blockquote className="relative z-10">
            <p className="font-display text-h2-mobile sm:text-h2-desktop text-forest leading-tight mb-8">
              &laquo;&nbsp;{data.quote}&nbsp;&raquo;
            </p>
            <footer className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
                <span className="font-display text-xl font-bold text-emerald">
                  {data.author.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <p className="font-body text-body font-semibold text-forest">{data.author}</p>
                <p className="text-body-sm text-muted">{data.country}</p>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}