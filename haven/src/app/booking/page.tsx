import type { Metadata } from 'next';
import { Clock, Shirt, MessageCircle, Utensils, Phone } from 'lucide-react';
import { FadeUp } from '@/components/FadeUp';
import { AcuityBookingEmbed } from '@/components/AcuityBookingEmbed';

export const metadata: Metadata = {
  title: 'Book a Session',
  description:
    'Book a therapeutic massage with Jane Smith LMT in Albany, Clifton Park, or Saratoga Springs NY. Online booking available. Swedish, Deep Tissue, Hot Stone, Prenatal, and Couples massage.',
  openGraph: {
    title: 'Book a Session | Haven Therapeutic Massage',
    description:
      'Book therapeutic massage online with Jane Smith LMT in Albany, Clifton Park, or Saratoga Springs NY.',
  },
  twitter: { card: 'summary_large_image' },
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
      <section className="bg-haven-surface pt-[96px] pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center lg:px-8">
          <FadeUp>
            <p className="mb-5 font-body text-[12px] font-medium uppercase tracking-[0.14em] text-haven-accent">
              Book a Session
            </p>
            <h1 className="mb-6 text-balance font-display text-[2.75rem] font-normal leading-[1.15] text-haven-text sm:text-[3.25rem]">
              Time with Jane.
            </h1>
            <p className="mx-auto max-w-md font-body text-[1.0625rem] font-light leading-[1.75] text-haven-text-muted">
              When you&apos;re ready, booking takes two minutes. Pick a time that works and Jane will
              take care of the rest.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="border-b border-haven-border bg-haven-bg py-16">
        <div className="max-w-2xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <h2 className="mb-8 text-center font-display text-[1.5rem] font-normal text-haven-text">
              Before you come in
            </h2>
          </FadeUp>
          <ul className="space-y-6">
            {prepItems.map(({ icon: Icon, text }, i) => (
              <FadeUp key={i} delay={i * 0.08}>
                <li className="flex items-start gap-4">
                  <span
                    className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-haven-surface"
                    aria-hidden="true"
                  >
                    <Icon size={17} strokeWidth={1.75} className="text-haven-accent" />
                  </span>
                  <p className="pt-1 font-body text-[1rem] font-light leading-[1.75] text-haven-text-muted">
                    {text}
                  </p>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-haven-border bg-haven-surface py-14">
        <div className="max-w-2xl mx-auto px-6 text-center lg:px-8">
          <FadeUp>
            <h2 className="mb-4 font-display text-[1.5rem] font-normal text-haven-text">
              Cancellations
            </h2>
            <p className="mx-auto max-w-prose font-body text-[1rem] font-light leading-[1.8] text-haven-text-muted">
              If something comes up, let Jane know at least 24 hours ahead. Life happens — she just
              needs the heads-up so she can offer the slot to someone else.
            </p>
          </FadeUp>
        </div>
      </section>

      <section className="bg-haven-bg py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <AcuityBookingEmbed acuityUrl={ACUITY_URL} />
          </FadeUp>
        </div>
      </section>

      <section className="bg-haven-surface py-14">
        <div className="max-w-xl mx-auto px-6 text-center lg:px-8">
          <FadeUp>
            <span
              className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-haven-bg"
              aria-hidden="true"
            >
              <Phone size={17} strokeWidth={1.75} className="text-haven-accent" />
            </span>
            <p className="mb-2 font-body text-[1rem] font-light leading-[1.75] text-haven-text-muted">
              Prefer to call? Jane answers personally.
            </p>
            <a
              href="tel:+15185550174"
              className="font-body text-[1.0625rem] font-semibold text-haven-accent transition-colors duration-200 hover:text-haven-secondary"
            >
              (518) 555-0174
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
