import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://haven.big-bad-coding.netlify.app/sitemap.xml',
  };
}
