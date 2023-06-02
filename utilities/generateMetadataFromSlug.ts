import { items } from "@/items";

export function generateMetadataFromSlug(slug?: string) {
  const item = items.find((item) => item.slug === slug);
  const path = item === undefined ? "" : `/item/${slug}`;
  const itemName = item?.name ?? "Trip Itinerary";

  const title = `My Trip Itinierary App | Your Personal AI ${itemName} Generator`;
  const description = `Automatically generate ${itemName.toLowerCase()}s using artificial intelligence. Tell us exactly how you would like to spend your ${itemName.toLowerCase()}. Tell us about you and what you love and we'll provide you with the perfect ${itemName.toLowerCase()}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://mytripitinerary.app${path}`,
      siteName: "My Trip Itinerary",
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      images: [`https://mytripitinerary.app${path}/opengraph-image`],
    },
  };
}
