import Image from 'next/image'
import Button from '@/components/ui/Button'

const instagramImages = [
  {
    src: 'https://images.unsplash.com/photo-1760627591383-fd47992375b8?w=900&q=80&auto=format&fit=crop',
    alt: 'Formal garden path framed by sculpted hedges and seasonal planting',
  },
  {
    src: 'https://images.unsplash.com/photo-1743167673050-62dddc5178d9?w=900&q=80&auto=format&fit=crop',
    alt: 'Luxury backyard pool with surrounding patio and seating areas',
  },
  {
    src: 'https://images.unsplash.com/photo-1755816764913-bd1104a26d78?w=900&q=80&auto=format&fit=crop',
    alt: 'Pergola-covered backyard garden with outdoor kitchen and lawn',
  },
  {
    src: 'https://images.unsplash.com/photo-1643063231577-959abf98b59c?w=900&q=80&auto=format&fit=crop',
    alt: 'Layered stone walls and pergola structure shaping a landscaped courtyard',
  },
]

export function InstagramPlaceholder() {
  return (
    <section className="bg-stone-mid py-section" aria-labelledby="instagram-headline">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:px-12 lg:grid-cols-[0.75fr_1.25fr] lg:px-20">
        <div className="max-w-md">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-text-muted">
            Follow the build diary
          </p>
          <h2 id="instagram-headline" className="mt-4 font-display text-5xl leading-[1.02] text-text-primary">
            A feed for the moments between design and reveal.
          </h2>
          <p className="mt-6 font-sans text-base leading-7 text-text-secondary">
            Use this band as the social proof placeholder until Verdant&apos;s real Instagram
            library is ready. It already behaves like a polished editorial gallery instead of a
            dead widget.
          </p>
          <div className="mt-8">
            <Button variant="ghost-dark" disabled className="rounded-full px-7">
              Instagram coming soon
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {instagramImages.map((img, index) => (
            <div
              key={img.src}
              className={`${index === 0 ? 'col-span-2' : ''} relative overflow-hidden rounded-[30px]`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[16/9]' : 'aspect-square'}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
