import { MetadataRoute } from "next";
import { poemTypesWithoutRandom } from "@/poems";
import { BASE_ORIGIN } from "@/utilities/constants";

export const articles: string[] = [
  "10-reasons-why-using-a-poem-generator-can-boost-your-creativity",
  "how-to-use-an-acrostic-poem-generator",
  "haiku-poem-generator-the-zen-art-of-poetic-composition",
  "sonnet-poem-generator-how-to-write-your-own-shakespearean-sonnet",
  "limerick-poem-generator-a-playful-and-witty-poetry-style",
  "the-pros-and-cons-of-using-a-poem-generator-for-poetry-writing",
  "love-poem-generator-create-romantic-poems-in-seconds",
  "the-evolution-of-poetry-writing-from-pen-and-paper-to-ai-poem-generators",
  "the-ethics-of-ai-poetry-should-we-consider-ai-generated-poems-as-art",
  "unleashing-creativity-exploring-the-art-of-acrostic-poetry",
  "unlocking-the-power-of-acrostic-poems-expressing-hidden-messages",
  "crafting-memorable-acrostic-poems-tips-for-effective-composition",
  "exploring-the-endless-possibilities-acrostic-poems-in-different-languages",
  "harnessing-ai-generating-acrostic-poems-with-poetry-tips",
  "unlocking-the-language-of-love-exploring-the-power-of-metaphors-in-love-poems",
  "crafting-love-poems-a-journey-through-rhythm-rhyme-and-meter",
  "the-evolving-landscape-of-love-poems-modern-approaches-and-contemporary-themes",
  "embracing-vulnerability-unveiling-the-power-of-raw-emotions-in-love-poems",
  "unleashing-the-magic-a-step-by-step-guide-to-using-the-love-poem-generator",
  "mastering-the-art-of-iambic-pentameter-a-guide-for-poets",
  "unlocking-the-beauty-of-sonnets-a-guide-to-understanding-and-appreciating-the-form",
  "the-sonnet-generator-unveiled-a-step-by-step-guide-to-creating-poetic-masterpieces",
  "from-words-to-whispers-how-to-write-a-poem",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${BASE_ORIGIN}`,
      lastModified: new Date(),
    },
    ...poemTypesWithoutRandom.map((poemType) => ({
      url: `${BASE_ORIGIN}/poem/${poemType.slug}`,
      lastModified: new Date(),
    })),
    {
      url: `${BASE_ORIGIN}/blog`,
      lastModified: new Date(),
    },
    ...articles.map((slug) => ({
      url: `${BASE_ORIGIN}/blog/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
