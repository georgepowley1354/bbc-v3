export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/15184502764?text=Hello%20Verdant%2C%20I'd%20like%20to%20talk%20about%20an%20outdoor%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Verdant on WhatsApp"
      className="fixed bottom-6 right-6 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(8,39,18,0.32)] transition-transform duration-200 hover:-translate-y-1"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M19.1 17.8c-.3-.1-1.8-.9-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-1 .9s-.4 0-.7-.2c-.3-.1-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.8-.9-2.4c-.2-.6-.4-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.3 1 2.6 1.1 2.8c.1.2 2 3 4.8 4.2.7.3 1.2.5 1.6.7.7.2 1.3.2 1.8.1.5-.1 1.8-.7 2.1-1.4.3-.7.3-1.2.2-1.3 0-.1-.2-.2-.5-.3Z"/>
        <path d="M16 3C8.8 3 3 8.7 3 15.8c0 2.3.6 4.5 1.8 6.5L3 29l6.9-1.8c1.9 1 4 1.6 6.1 1.6 7.2 0 13-5.7 13-12.8S23.2 3 16 3Zm0 23.5c-2 0-4-.6-5.7-1.7l-.4-.2-4.1 1.1 1.1-4-.3-.4c-1.2-1.8-1.8-3.8-1.8-5.9C4.8 9.6 9.8 4.6 16 4.6s11.2 5 11.2 11.2S22.2 26.5 16 26.5Z"/>
      </svg>
    </a>
  )
}

