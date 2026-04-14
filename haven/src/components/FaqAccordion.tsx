'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'What happens during my first visit?',
    answer:
      "When you arrive, you'll fill out a short health history form — about five minutes. Jane will take a few minutes to talk through what you're dealing with before the session starts. You'll have privacy to get settled, and she'll check in at the end.",
  },
  {
    question: 'What should I wear?',
    answer:
      "Wear whatever is comfortable to drive in. You'll undress to your own comfort level — most clients undress completely, but you are always draped and only what Jane is actively working on is ever uncovered.",
  },
  {
    question: 'Can I ask for more or less pressure?',
    answer:
      "Always. Jane checks in during the session, but you never have to wait for her to ask. If something is too much or not enough, say so — she adjusts immediately and it doesn't change anything.",
  },
  {
    question: 'Is tipping expected?',
    answer:
      "It's appreciated but entirely up to you. Jane's rates reflect the full value of the work. If you'd like to tip, cash at the end of the session or a Google review both mean a lot.",
  },
  {
    question: "What's the cancellation policy?",
    answer:
      'If something comes up, please let Jane know at least 24 hours before your appointment. Life happens — she just needs the heads-up so she can offer that time to someone else. Late cancellations may be subject to a fee.',
  },
  {
    question: 'Is prenatal massage safe?',
    answer:
      "Yes, with the right therapist. Jane is certified in prenatal massage and has worked with pregnant clients throughout her 25 years of practice. Prenatal sessions use side-lying positioning and gentler pressure, appropriate from the second trimester onward. If you have any medical concerns, check with your OB first.",
  },
  {
    question: 'Do you offer gift certificates?',
    answer:
      "Yes. Gift certificates are available for any service or as a dollar amount. Call or text Jane at (518) 555-0174 to arrange one — she'll make it easy.",
  },
  {
    question: 'Where is parking?',
    answer:
      'There is free parking directly in front of the building. If the front spots are taken, additional parking is available around back. Jane will send you details when you book.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'Cash, card (Visa, Mastercard, Amex, Discover), Venmo, and Zelle. Payment is collected at the end of your session.',
  },
  {
    question: 'Is there a new client discount?',
    answer:
      'Yes — 20% off your first session. It applies automatically when you book through the website. No code needed.',
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <div className="divide-y divide-haven-border border-t border-haven-border">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        const isLast = index === faqs.length - 1;

        return (
          <div key={index} className={isLast ? '' : ''}>
            <button
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="font-body font-medium text-[17px] text-haven-text leading-snug">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className="flex-shrink-0 text-haven-accent text-2xl leading-none select-none"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="font-body font-light text-[15px] leading-[1.7] text-haven-text-muted pb-5 pr-10">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
