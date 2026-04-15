import Link from 'next/link';

export function StickyBookNow() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex md:hidden"
      style={{ boxShadow: '0 -4px 16px rgba(44, 35, 28, 0.15)', paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <Link
        href="/booking"
        className="flex-1 flex items-center justify-center h-14 font-body font-semibold text-[17px] tracking-wide text-haven-text-inverse bg-haven-accent-interactive hover:bg-haven-accent-hover transition-colors duration-200 cursor-pointer"
      >
        Book Now
      </Link>
    </div>
  );
}
