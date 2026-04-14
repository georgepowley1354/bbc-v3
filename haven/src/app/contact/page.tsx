import type { Metadata } from 'next';
import { FadeUp } from '@/components/FadeUp';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Reach Jane Smith LMT at Haven Therapeutic Massage. Serving Albany, Clifton Park, and Saratoga Springs NY. Call, text, or send a message.',
  openGraph: {
    title: 'Contact | Haven Therapeutic Massage',
    description:
      'Reach Jane Smith LMT at Haven Therapeutic Massage. Serving Albany, Clifton Park, and Saratoga Springs NY.',
  },
  twitter: { card: 'summary_large_image' },
};

function FacebookIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GooglePlaceholderIcon() {
  return (
    <span
      aria-hidden="true"
      className="w-4 h-4 flex items-center justify-center font-display font-bold text-[13px] leading-none"
    >
      G
    </span>
  );
}

const socialLinks = [
  {
    label: 'Facebook',
    href: 'https://facebook.com/havenmassageny',
    Icon: FacebookIcon,
    title: 'Haven on Facebook',
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/havenmassageny',
    Icon: InstagramIcon,
    title: 'Haven on Instagram',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/janesmith-lmt',
    Icon: LinkedInIcon,
    title: 'Jane Smith LMT on LinkedIn',
  },
  {
    label: 'Google',
    href: '#',
    Icon: GooglePlaceholderIcon,
    title: 'Google Business — link coming soon',
    placeholder: true,
  },
];

const serviceAreas = ['Albany', 'Clifton Park', 'Saratoga Springs'];

export default function ContactPage() {
  return (
    <>
      {/* Section 1 — Page Header */}
      <section className="bg-haven-surface pt-[96px] pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="font-body text-[13px] font-medium uppercase tracking-[0.12em] text-haven-accent mb-4">
              Get in Touch
            </p>
          </FadeUp>
          <FadeUp delay={0.08}>
            <h1 className="font-display text-4xl md:text-5xl text-haven-text leading-tight mb-5">
              Come find your quiet.
            </h1>
          </FadeUp>
          <FadeUp delay={0.16}>
            <p className="font-body text-[17px] text-haven-text-muted leading-relaxed max-w-xl mx-auto">
              Haven serves clients across Albany, Clifton Park, and Saratoga Springs — reach out whenever you&apos;re ready.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Section 2 — Contact Info + Form */}
      <section className="bg-haven-bg py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Left — Contact Details */}
            <FadeUp>
              <div className="space-y-8">

                {/* Phone */}
                <div>
                  <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-haven-text-muted mb-1.5">
                    Call or text
                  </p>
                  <a
                    href="tel:+15185550174"
                    className="font-display text-2xl text-haven-text hover:text-haven-accent transition-colors"
                  >
                    (518) 555-0174
                  </a>
                </div>

                {/* Email */}
                <div>
                  <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-haven-text-muted mb-1.5">
                    Email
                  </p>
                  <a
                    href="mailto:jane@havenmassageny.com"
                    className="font-body text-[16px] text-haven-text hover:text-haven-accent transition-colors"
                  >
                    jane@havenmassageny.com
                  </a>
                </div>

                {/* Hours */}
                <div>
                  <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-haven-text-muted mb-3">
                    Hours
                  </p>
                  <ul className="space-y-1.5 font-body text-[15px] text-haven-text">
                    <li className="flex justify-between gap-8">
                      <span>Monday–Friday</span>
                      <span className="text-haven-text-muted">9am–7pm</span>
                    </li>
                    <li className="flex justify-between gap-8">
                      <span>Saturday</span>
                      <span className="text-haven-text-muted">9am–5pm</span>
                    </li>
                    <li className="flex justify-between gap-8">
                      <span>Sunday</span>
                      <span className="text-haven-text-muted">Closed</span>
                    </li>
                  </ul>
                </div>

                {/* Social Links */}
                <div>
                  <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-haven-text-muted mb-3">
                    Follow along
                  </p>
                  <div className="flex items-center gap-2.5">
                    {socialLinks.map(({ label, href, Icon, title, placeholder }) => (
                      <a
                        key={label}
                        href={href}
                        title={title}
                        aria-label={title}
                        target="_blank"
                        rel={placeholder ? undefined : 'noopener noreferrer'}
                        className="w-9 h-9 rounded-full flex items-center justify-center bg-haven-surface text-haven-accent hover:text-haven-secondary transition-colors"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div>
                  <p className="font-body text-[13px] font-medium uppercase tracking-[0.08em] text-haven-text-muted mb-3">
                    Service areas
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {serviceAreas.map((area) => (
                      <span
                        key={area}
                        className="inline-block bg-haven-surface text-haven-accent font-body text-[13px] font-medium px-3 py-1 rounded-full border border-haven-border"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* Right — Netlify Form */}
            <FadeUp delay={0.1}>
              <div>
                <form
                  action="/contact/success"
                  method="POST"
                  data-netlify="true"
                  name="contact"
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="contact" />

                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="font-body text-[13px] font-medium text-haven-text-muted uppercase tracking-[0.08em] mb-1.5 block">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className="w-full bg-white border border-haven-border rounded px-4 py-3 font-body text-[15px] text-haven-text placeholder:text-haven-text-muted/50 focus:outline-none focus:border-haven-accent transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="font-body text-[13px] font-medium text-haven-text-muted uppercase tracking-[0.08em] mb-1.5 block">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="your@email.com"
                      className="w-full bg-white border border-haven-border rounded px-4 py-3 font-body text-[15px] text-haven-text placeholder:text-haven-text-muted/50 focus:outline-none focus:border-haven-accent transition-colors"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="font-body text-[13px] font-medium text-haven-text-muted uppercase tracking-[0.08em] mb-1.5 block">
                      Phone <span className="normal-case tracking-normal font-normal text-haven-text-muted/60">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      placeholder="(518) 555-0000"
                      className="w-full bg-white border border-haven-border rounded px-4 py-3 font-body text-[15px] text-haven-text placeholder:text-haven-text-muted/50 focus:outline-none focus:border-haven-accent transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="font-body text-[13px] font-medium text-haven-text-muted uppercase tracking-[0.08em] mb-1.5 block">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder="What's on your mind?"
                      className="w-full bg-white border border-haven-border rounded px-4 py-3 font-body text-[15px] text-haven-text placeholder:text-haven-text-muted/50 focus:outline-none focus:border-haven-accent transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full bg-haven-accent hover:bg-haven-accent-interactive text-haven-text-inverse font-body font-medium text-[15px] tracking-wide py-3.5 rounded transition-colors"
                  >
                    Send message
                  </button>

                  <p className="font-body text-[13px] text-haven-text-muted text-center">
                    Jane personally reads every message.
                  </p>
                </form>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Section 3 — Service Areas Map Placeholder */}
      <section className="bg-haven-surface py-16">
        <div className="max-w-5xl mx-auto px-6">
          <FadeUp>
            <h2 className="font-display text-3xl text-haven-text text-center mb-10">
              Where to find Haven
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {serviceAreas.map((city, i) => (
              <FadeUp key={city} delay={i * 0.08}>
                <div className="bg-haven-bg rounded shadow-card p-6 flex flex-col gap-3">
                  <h3 className="font-display text-xl text-haven-text">{city}</h3>
                  <div className="w-full aspect-[4/3] bg-haven-surface rounded flex items-center justify-center">
                    <p className="font-body text-sm text-haven-text-muted text-center px-4">
                      Map coming soon
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.3}>
            <p className="font-body text-sm text-haven-text-muted text-center mt-8">
              Exact address provided upon booking.
            </p>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
