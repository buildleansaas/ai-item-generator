import { MetadataRoute } from "next";
import { items } from "@/items";

export const articles: string[] = []; // TODO: generate by reading files in /markdown

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.DOMAIN",
      lastModified: new Date(),
    },
    ...items.map((item) => ({
      url: `https://www.DOMAIN/item/${item.slug}`,
      lastModified: new Date(),
    })),
    {
      url: "https://www.DOMAIN/blog",
      lastModified: new Date(),
    },
    ...articles.map((slug) => ({
      url: `https://www.DOMAIN/blog/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
