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
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
    .join('&')
}

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion()
  const [values, setValues] = useState<ContactFormValues>(emptyForm)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [honeypot, setHoneypot] = useState('')

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    if (fieldErrors[name as keyof ContactFormValues]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // Client-side validation
    const errors: Partial<Record<keyof ContactFormValues, string>> = {}
    if (!values.name.trim()) errors.name = 'Full name is required.'
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!values.email.trim()) {
      errors.email = 'Email address is required.'
    } else if (!emailPattern.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!values.projectType) errors.projectType = 'Please select a service type.'
    if (!values.description.trim()) errors.description = 'Project description is required.'

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/', {
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

      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
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
        className="text-center py-16 px-6"
      >
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-gold mb-4">Message Received</p>
        <h3 className="font-display text-4xl md:text-5xl text-text-primary mb-6">
          We&apos;ll be in touch within 48 hours.
        </h3>
        <p className="font-sans text-lg text-text-secondary max-w-md mx-auto">
          Thank you for reaching out. Marcus reviews every inquiry personally and will
          respond within two business days.
        </p>
      </MotionDiv>
    )
  }

  return (
    <>
      {/* Screen reader status announcer */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {status === 'error' && 'Something went wrong. Please try again or email us directly at hello@verdantdesign.com'}
        {status === 'submitting' && 'Sending your inquiry…'}
      </div>
      <MotionDiv
        variants={prefersReducedMotion ? undefined : stagger}
        initial={prefersReducedMotion ? undefined : 'hidden'}
        whileInView={prefersReducedMotion ? undefined : 'visible'}
        viewport={{ once: true, margin: '-80px' }}
      >
      <form
        name="contact"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Hidden fields required by Netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <input
          name="bot-field"
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />

        <div className="space-y-8">
          {/* Row 1: Name + Email */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
              >
                Full Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Jane Smith"
                className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-sage transition-colors duration-200"
                aria-required="true"
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              />
              {fieldErrors.name && (
                <p id="name-error" className="font-sans text-sm text-red-600 mt-1" role="alert">
                  {fieldErrors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
              >
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-sage transition-colors duration-200"
                aria-required="true"
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="font-sans text-sm text-red-600 mt-1" role="alert">
                  {fieldErrors.email}
                </p>
              )}
            </div>
          </MotionDiv>

          {/* Row 2: Phone + Project Type */}
          <MotionDiv
            variants={prefersReducedMotion ? undefined : fadeUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          >
            {/* Phone (optional) */}
            <div>
              <label
                htmlFor="phone"
                className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                placeholder="(518) 555-0100"
                className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-sage transition-colors duration-200"
              />
            </div>

            {/* Project Type (required) */}
            <div>
              <label
                htmlFor="projectType"
                className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
              >
                Project Type *
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={values.projectType}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary focus:outline-none focus:border-sage transition-colors duration-200 appearance-none cursor-pointer pr-8"
                  aria-required="true"
                  aria-describedby={fieldErrors.projectType ? 'projectType-error' : undefined}
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Hardscape">Hardscape</option>
                  <option value="Softscape">Softscape</option>
                  <option value="Pool & Water">Pool &amp; Water</option>
                  <option value="Outdoor Kitchen">Outdoor Kitchen</option>
                  <option value="Full Property Design">Full Property Design</option>
                  <option value="Maintenance Plan">Maintenance Plan</option>
                </select>
                <svg
                  className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
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
              </div>
              {fieldErrors.projectType && (
                <p id="projectType-error" className="font-sans text-sm text-red-600 mt-1" role="alert">
                  {fieldErrors.projectType}
                </p>
              )}
            </div>
          </MotionDiv>

          {/* Row 3: Budget Range */}
          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
            <label
              htmlFor="budgetRange"
              className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
            >
              Approximate Budget
            </label>
            <div className="relative">
              <select
                id="budgetRange"
                name="budgetRange"
                value={values.budgetRange}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary focus:outline-none focus:border-sage transition-colors duration-200 appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled>Select a range</option>
                <option value="Under $25k">Under $25k</option>
                <option value="$25k – $75k">$25k – $75k</option>
                <option value="$75k – $150k">$75k – $150k</option>
                <option value="$150k – $300k">$150k – $300k</option>
                <option value="$300k+">$300k+</option>
              </select>
              <svg
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
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
            </div>
          </MotionDiv>

          {/* Row 4: Project Description */}
          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
            <label
              htmlFor="description"
              className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
            >
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Tell us about your property, what you're envisioning, and any specific requirements or constraints."
              rows={5}
              className="w-full bg-transparent border border-stone-dark py-3 px-4 font-sans text-base text-text-primary placeholder-text-muted focus:outline-none focus:border-sage transition-colors duration-200 resize-none min-h-[140px]"
              aria-required="true"
              aria-describedby={fieldErrors.description ? 'description-error' : undefined}
            />
            {fieldErrors.description && (
              <p id="description-error" className="font-sans text-sm text-red-600 mt-1" role="alert">
                {fieldErrors.description}
              </p>
            )}
          </MotionDiv>

          {/* Row 5: Preferred Timeline */}
          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp}>
            <label
              htmlFor="timeline"
              className="font-sans text-[11px] tracking-[0.15em] uppercase text-text-muted mb-2 block"
            >
              Preferred Timeline
            </label>
            <div className="relative">
              <select
                id="timeline"
                name="timeline"
                value={values.timeline}
                onChange={handleChange}
                className="w-full bg-transparent border-b border-stone-dark py-3 font-sans text-base text-text-primary focus:outline-none focus:border-sage transition-colors duration-200 appearance-none cursor-pointer pr-8"
              >
                <option value="" disabled>Select a timeline</option>
                <option value="This season">This season</option>
                <option value="Within 6 months">Within 6 months</option>
                <option value="Within a year">Within a year</option>
                <option value="Planning ahead">Planning ahead</option>
              </select>
              <svg
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
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
            </div>
          </MotionDiv>

          {/* Submit */}
          <MotionDiv variants={prefersReducedMotion ? undefined : fadeUp} className="pt-4">
            {status === 'error' && (
              <p className="font-sans text-sm text-red-600 mb-4" role="alert">
                Something went wrong. Please try again or email us directly at hello@verdantdesign.com
              </p>
            )}
            <Button variant="primary" size="lg" type="submit" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Inquiry'}
            </Button>
          </MotionDiv>
        </div>
      </form>
    </MotionDiv>
    </>
  )
}
