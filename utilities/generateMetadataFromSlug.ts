import { items } from "@/items";

export function generateMetadataFromSlug(slug?: string) {
  const item = items.find((item) => item.slug === slug);
  const path = item === undefined ? "" : `/item/${slug}`;
  const itemName = item?.name ?? "Item";

  const title = `AI ${itemName} Generator`;
  const description = `Automatically generate ${itemName.toLowerCase()}s using artificial intelligence. Just describe the theme of your item and the item generator will do all the rhyming and syllables for you.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://COMPANY_DOMAIN${path}`,
      siteName: "COMPANY_NAME",
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [`https://COMPANY_DOMAIN${path}/opengraph-image`],
    },
  };
}
