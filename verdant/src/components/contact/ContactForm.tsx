'use client'

import { useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { MotionDiv } from '@/components/ui/MotionDiv'
import { fadeUp, stagger } from '@/constants/animation'
import Button from '@/components/ui/Button'
import type { ContactFormValues } from '@/types'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const emptyForm: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  projectType: '',
  budgetRange: '',
  description: '',
  timeline: '',
}

function encode(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

function SelectChevron() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion()
  const [values, setValues] = useState<ContactFormValues>(emptyForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [honeypot, setHoneypot] = useState('')

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name as keyof ContactFormValues]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const errors: Partial<Record<keyof ContactFormValues, string>> = {}
    if (!values.name.trim()) errors.name = 'Full name is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!emailPattern.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!values.projectType) errors.projectType = 'Please choose a project type.'
    if (!values.budgetRange) errors.budgetRange = 'Please select an investment range.'
    if (!values.description.trim()) errors.description = 'Project details are required.'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({
          'form-name': 'contact',
          'bot-field': honeypot,
          name: values.name,
          email: values.email,
          phone: values.phone,
          projectType: values.projectType,
          budgetRange: values.budgetRange,
          description: values.description,
          timeline: values.timeline,
        }),
      })

      setStatus(response.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <MotionDiv
        variants={prefersReducedMotion ? undefined : fadeUp}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
        className="rounded-[36px] bg-stone-mid px-6 py-16 text-center md:px-10"
      >
        <div className="mx-auto mb-8 w-12 border-t border-gold" />
        <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-gold">Inquiry received</p>
        <h3 className="mt-5 font-display text-4xl text-text-primary md:text-5xl">
          We’ll review your project and respond within 48 hours.
        </h3>
        <p className="mx-auto mt-6 max-w-lg font-sans text-lg leading-8 text-text-secondary">
          Marcus and the Verdant team review every inquiry personally, then confirm fit, timing,
          and the next best step for your property.
        </p>
      </MotionDiv>
    )
  }

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'error' && 'There was a problem sending your inquiry. Please try again.'}
        {status === 'submitting' && 'Sending your inquiry'}
      </div>

      <MotionDiv
        variants={prefersReducedMotion ? undefined : stagger}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        animate={prefersReducedMotion ? undefined : 'visible'}
      >
        <form
          name="contact"
          onSubmit={handleSubmit}
          noValidate
          className="rounded-[36px] border border-stone-dark/70 bg-stone-mid px-6 py-8 shadow-[0_26px_70px_rgba(28,43,30,0.08)] md:px-10 md:py-10"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input
            name="bot-field"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />

          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
              Premium inquiry
            </p>
            <h3 className="mt-3 font-display text-4xl text-text-primary">
              Tell us about the property and the transformation you’re after.
            </h3>
            <p className="mt-4 max-w-2xl font-sans text-base leading-7 text-text-secondary">
              This form is designed for serious projects. If you already know your range, timeline,
              and desired scope, you’ll receive a more precise response from the first conversation.
            </p>
          </MotionDiv>

          <div className="mt-10 space-y-8">
            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <label htmlFor="name" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="w-full border-b border-stone-dark bg-transparent py-3 font-sans text-base text-text-primary placeholder:text-text-muted focus:border-sage focus:outline-none"
                />
                {fieldErrors.name && <p className="mt-1 text-sm text-red-600">{fieldErrors.name}</p>}
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  className="w-full border-b border-stone-dark bg-transparent py-3 font-sans text-base text-text-primary placeholder:text-text-muted focus:border-sage focus:outline-none"
                />
                {fieldErrors.email && <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>}
              </div>
            </MotionDiv>

            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <label htmlFor="phone" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  placeholder="(518) 555-0100"
                  className="w-full border-b border-stone-dark bg-transparent py-3 font-sans text-base text-text-primary placeholder:text-text-muted focus:border-sage focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="projectType" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Project Type *
                </label>
                <div className="relative">
                  <select
                    id="projectType"
                    name="projectType"
                    value={values.projectType}
                    onChange={handleChange}
                    className="w-full appearance-none border-b border-stone-dark bg-transparent py-3 pr-8 font-sans text-base text-text-primary focus:border-sage focus:outline-none"
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="Hardscape">Hardscape</option>
                    <option value="Softscape">Softscape</option>
                    <option value="Pool & Water">Pool &amp; Water</option>
                    <option value="Outdoor Kitchen">Outdoor Kitchen</option>
                    <option value="Full Property Design">Full Property Design</option>
                    <option value="Maintenance Plan">Maintenance Plan</option>
                  </select>
                  <SelectChevron />
                </div>
                {fieldErrors.projectType && <p className="mt-1 text-sm text-red-600">{fieldErrors.projectType}</p>}
              </div>
            </MotionDiv>

            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="grid gap-6 md:grid-cols-2 md:gap-8">
              <div>
                <label htmlFor="budgetRange" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Planned Investment *
                </label>
                <div className="relative">
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={values.budgetRange}
                    onChange={handleChange}
                    className="w-full appearance-none border-b border-stone-dark bg-transparent py-3 pr-8 font-sans text-base text-text-primary focus:border-sage focus:outline-none"
                  >
                    <option value="" disabled>Select a range</option>
                    <option value="$25k-50k">$25k-50k</option>
                    <option value="$50k-100k">$50k-100k</option>
                    <option value="$100k+">$100k+</option>
                  </select>
                  <SelectChevron />
                </div>
                {fieldErrors.budgetRange && <p className="mt-1 text-sm text-red-600">{fieldErrors.budgetRange}</p>}
              </div>
              <div>
                <label htmlFor="timeline" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                  Preferred Timeline
                </label>
                <div className="relative">
                  <select
                    id="timeline"
                    name="timeline"
                    value={values.timeline}
                    onChange={handleChange}
                    className="w-full appearance-none border-b border-stone-dark bg-transparent py-3 pr-8 font-sans text-base text-text-primary focus:border-sage focus:outline-none"
                  >
                    <option value="" disabled>Select a timeline</option>
                    <option value="This season">This season</option>
                    <option value="Within 6 months">Within 6 months</option>
                    <option value="Within a year">Within a year</option>
                    <option value="Planning ahead">Planning ahead</option>
                  </select>
                  <SelectChevron />
                </div>
              </div>
            </MotionDiv>

            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
              <label htmlFor="description" className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-muted">
                Project Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Share the property condition, what you want to change, the level of finish you’re after, and anything that matters before we meet."
                rows={6}
                className="min-h-[160px] w-full resize-none border-b border-stone-dark bg-transparent py-3 font-sans text-base text-text-primary placeholder:text-text-muted focus:border-sage focus:outline-none"
              />
              {fieldErrors.description && <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>}
            </MotionDiv>

            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="rounded-[28px] bg-forest-deep px-5 py-5 text-white">
              <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-gold/90">
                What happens next
              </p>
              <ol className="mt-4 grid gap-3 font-sans text-sm leading-6 text-white/76 md:grid-cols-3">
                <li>1. We review fit, timing, and budget alignment.</li>
                <li>2. We confirm your consultation window and site visit details.</li>
                <li>3. You receive a clear next-step recommendation from the Verdant team.</li>
              </ol>
            </MotionDiv>

            <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="pt-2">
              {status === 'error' && (
                <p className="mb-4 font-sans text-sm text-red-600" role="alert">
                  Something went wrong. Please try again or email inquiries@verdant.bbc-agency.com directly.
                </p>
              )}
              <Button
                variant="primary"
                size="lg"
                type="submit"
                disabled={status === 'submitting'}
                className="rounded-full px-8"
              >
                {status === 'submitting' ? 'Sending...' : 'Submit premium inquiry'}
              </Button>
            </MotionDiv>
          </div>
        </form>
      </MotionDiv>
    </>
  )
}
