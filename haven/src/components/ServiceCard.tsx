'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  name: string;
  duration: string;
  price: string;
  tagline: string;
  description: string;
  benefits: string[];
  bestFor: string;
}

export function ServiceCard({
  icon,
  name,
  duration,
  price,
  tagline,
  description,
  benefits,
  bestFor,
}: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const benefitsId = `benefits-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className="bg-haven-bg border border-haven-border rounded-xl p-7 flex flex-col gap-5 shadow-card hover:shadow-card-hover transition-shadow duration-200 h-full">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ backgroundColor: 'rgba(125, 155, 118, 0.12)' }}
        >
          {icon}
        </div>
        <div>
          <h2 className="font-display text-[1.375rem] font-semibold text-haven-text leading-tight">
            {name}
          </h2>
          <p className="font-body font-medium text-[13px] text-haven-text-muted tracking-wide mt-1">
            {duration} · {price}
          </p>
        </div>
      </div>

      {/* Tagline + description */}
      <div className="flex flex-col gap-2">
        <p className="font-display italic text-[1rem] text-haven-text leading-[1.6]">
          {tagline}
        </p>
        <p className="font-body font-light text-[15px] leading-[1.75] text-haven-text-muted">
          {description}
        </p>
      </div>

      {/* Expandable benefits */}
      <div>
        <button
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          aria-controls={benefitsId}
          className="flex items-center gap-1.5 font-body font-medium text-[13px] text-haven-accent-interactive hover:text-haven-accent transition-colors duration-200 cursor-pointer"
        >
          <span>{expanded ? 'Hide benefits' : 'What this helps with'}</span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex"
          >
            <ChevronDown size={14} aria-hidden="true" />
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={benefitsId}
              key="benefits"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <ul
                className="pt-3 flex flex-col gap-2"
                aria-label={`Benefits of ${name}`}
              >
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <Check
                      size={14}
                      className="text-haven-accent flex-shrink-0 mt-[3px]"
                      aria-hidden="true"
                    />
                    <span className="font-body font-light text-[14px] leading-[1.65] text-haven-text-muted">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Best for + CTA */}
      <div className="mt-auto border-t border-haven-border-subtle pt-5 flex flex-col gap-4">
        <p className="font-body font-medium text-[13px] text-haven-accent-interactive">
          Best for:{' '}
          <span className="font-light text-haven-text-muted">{bestFor}</span>
        </p>
        <Link
          href="/booking"
          className="inline-flex items-center justify-center w-full py-3 font-body font-semibold text-[14px] tracking-wide border border-haven-accent text-haven-accent-interactive rounded transition-all duration-200 hover:bg-haven-surface hover:border-haven-accent-interactive cursor-pointer"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
