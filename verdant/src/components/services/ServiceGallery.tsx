import Image from 'next/image'

interface ServiceGalleryProps {
  images: string[]
  serviceName: string
}

export function ServiceGallery({ images, serviceName }: ServiceGalleryProps) {
  if (images.length === 0) return null

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-[50vh] min-h-[300px]">
      {images.slice(0, 2).map((src, i) => (
        <div key={src} className="relative overflow-hidden">
          <Image
            src={src}
            alt={`${serviceName} project detail ${i + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ))}
    </section>
  )
}
