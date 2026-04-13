import type { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { services } from '@/data/services'

const BASE_URL = 'https://verdant.bbc-agency.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, priority: 1.0, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/portfolio`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: 'monthly' as const },
    { url: `${BASE_URL}/about`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/process`, priority: 0.7, changeFrequency: 'yearly' as const },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'yearly' as const },
  ]

  const projectPages = projects.map((p) => ({
    url: `${BASE_URL}/portfolio/${p.slug}`,
    priority: 0.8,
    changeFrequency: 'yearly' as const,
    lastModified: new Date(),
  }))

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: 'yearly' as const,
    lastModified: new Date(),
  }))

  return [...staticPages, ...projectPages, ...servicePages]
}
