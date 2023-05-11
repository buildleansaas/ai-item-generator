import { items } from "@/items";
import { createOpenGraphImage } from "@/utilities/createOpenGraphImage";
import { generateMetadataFromSlug } from "@/utilities/generateMetadataFromSlug";

export default async function og({ params }: { params: { slug: string } }) {
  const item = items.find((item) => item.slug === params.slug);

  return createOpenGraphImage({
    ...generateMetadataFromSlug(params.slug),
    color: item?.classNames.color,
  });
}
