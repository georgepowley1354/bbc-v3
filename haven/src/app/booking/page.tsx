import type { Metadata } from 'next';
import { Clock, Shirt, MessageCircle, Utensils, Phone } from 'lucide-react';
import { FadeUp } from '@/components/FadeUp';
import { AcuityBookingEmbed } from '~/my-project/haven-components';

export const metadata: Metadata = {
  title: 'Book a Session',
  description:
    'Book a therapeutic massage with Jane Smith LMT in Albany, Clifton Park, or Saratoga Springs NY. Online booking available. Swedish, Deep Tissue, Hot Stone, Prenatal, and Couples massage.',
};

const ACUITY_URL =
  'https://app.acuityscheduling.com/schedule/0f4e6dff/appointment/91881173/calendar/13937249';

const prepItems = [
  {
    icon: Clock,
    text: 'Arrive five to ten minutes early. It gives you time to settle in before your session starts.',
  },
  {
    icon: Shirt,
    text: "Wear something comfortable. You'll be asked to undress to your level of comfort — there's no right answer.",
  },
  {
    icon: MessageCircle,
    text: 'Tell Jane your pressure preference at the start. Too light, too deep — she adjusts throughout. Just say so.',
  },
  {
    icon: Utensils,
    text: 'Skip the heavy meal beforehand. A light snack is fine; a full stomach makes lying face-down less comfortable.',
  },
];

export default function BookingPage() {
  return (
    <>
      {/* Page header */}
      <section className="bg-haven-surface pt-[96px] pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.14em] text-haven-accent mb-5">
              Book a Session
            </p>
            <h1 className="font-display text-[2.75rem] sm:text-[3.25rem] font-normal text-haven-text mb-6 text-balance leading-[1.15]">
              Time with Jane.
            </h1>
            <p className="font-body font-light text-[1.0625rem] leading-[1.75] text-haven-text-muted max-w-md mx-auto">
              When you're ready, booking takes two minutes. Pick a time that works and Jane will
              take care of the rest.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Prep section */}
      <section className="bg-haven-bg py-16 border-b border-haven-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <h2 className="font-display text-[1.5rem] font-normal text-haven-text mb-8 text-center">
              Before you come in
            </h2>
          </FadeUp>
          <ul className="space-y-6">
            {prepItems.map(({ icon: Icon, text }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <li className="flex items-start gap-4">
                  <span className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-full bg-haven-surface flex items-center justify-center">
                    <Icon size={17} strokeWidth={1.75} className="text-haven-accent" />
                  </span>
                  <p className="font-body font-light text-[1rem] leading-[1.75] text-haven-text-muted pt-1">
                    {text}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      {/* Cancellation section */}
      <section className="bg-haven-surface py-14 border-b border-haven-border">
        <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <h2 className="font-display text-[1.5rem] font-normal text-haven-text mb-4">
              Cancellations
            </h2>
            <p className="font-body font-light text-[1rem] leading-[1.8] text-haven-text-muted max-w-prose mx-auto">
              If something comes up, let Jane know at least 24 hours ahead. Life happens — she just
              needs the heads-up so she can offer the slot to someone else.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Acuity booking embed */}
      <section className="bg-haven-bg py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <AcuityBookingEmbed acuityUrl={ACUITY_URL} />
          </FadeUp>
        </div>
      </section>

      {/* Phone fallback */}
      <section className="bg-haven-surface py-14">
        <div className="max-w-xl mx-auto px-6 lg:px-8 text-center">
          <FadeUp>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-haven-bg mb-5">
              <Phone size={17} strokeWidth={1.75} className="text-haven-accent" />
            </span>
            <p className="font-body font-light text-[1rem] leading-[1.75] text-haven-text-muted mb-2">
              Prefer to call? Jane answers personally.
            </p>
            <a
              href="tel:+15185550174"
              className="font-body font-semibold text-[1.0625rem] text-haven-accent hover:text-haven-secondary transition-colors duration-200"
            >
              (518) 555-0174
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
