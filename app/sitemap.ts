import { MetadataRoute } from "next";
import { items } from "@/items";

export const articles: string[] = []; // TODO: generate by reading files in /markdown

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: "https://www.mytripitinerary.app",
      lastModified: new Date(),
    },
    ...items.map((item) => ({
      url: `https://www.mytripitinerary.app/item/${item.slug}`,
      lastModified: new Date(),
    })),
    {
      url: "https://www.mytripitinerary.app/blog",
      lastModified: new Date(),
    },
    ...articles.map((slug) => ({
      url: `https://www.mytripitinerary.app/blog/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
