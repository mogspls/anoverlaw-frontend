import { MetadataRoute } from "next";

const domain = process.env.NEXT_DOMAIN_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1
    },
    {
      url: `${domain}/about`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: `${domain}/services`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5
    },
  ];
}