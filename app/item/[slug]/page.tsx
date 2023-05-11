import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { ItemGenerator } from "@/components/ItemGenerator";
import { items } from "@/items";
import { generateMetadataFromSlug } from "@/utilities/generateMetadataFromSlug";
import { notFound } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function generateMetadata({ params }: { params: { slug: string } }) {
  return generateMetadataFromSlug(params.slug);
}

export default function ItemPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const item = items.find((item) => item.slug === params.slug);

  if (item === undefined) {
    return notFound();
  }

  return (
    <Container className="pt-16 pb-24">
      <HeroPattern className={item.classNames.background} />
      <h1
        className={twMerge(
          "sm:text-center text-4xl/snug sm:text-5xl/snug md:text-6xl/snug font-bold tracking-tight mb-16 sm:mb-24 lg:mb-32",
          item.classNames.title
        )}
      >
        {item.name} Generator
      </h1>
      <ItemGenerator type={item.name} />
      <dl className="mt-24 sm:mt-32 space-y-8 divide-y divide-gray-900/10">
        <div className="pt-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-1">
            What is {item.indefiniteArticle} {item.name.toLowerCase()}?
          </dt>
          <dd className="mt-4 lg:col-span-2 lg:mt-0">
            <p className="text-base leading-7 text-gray-600">
              {item.description}
            </p>
          </dd>
        </div>
        <div className="pt-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-1">
            How do you write {item.indefiniteArticle} {item.name.toLowerCase()}?
          </dt>
          <dd className="mt-4 lg:col-span-2 lg:mt-0">
            <p className="text-base leading-7 text-gray-600 mb-4">
              Here are the steps to write write {item.indefiniteArticle}{" "}
              {item.name.toLowerCase()}:
            </p>
            <ol className="list-decimal text-base leading-7 text-gray-600 marker:tracking-tighter">
              {item.steps.map((step) => {
                const summaryPosition = step.indexOf(":");
                const [summary, complete] = [
                  step.substring(0, summaryPosition),
                  step.substring(summaryPosition + 1),
                ];
                return (
                  <li key={step} className="pl-1 ml-5 mb-2">
                    <strong className="font-semibold">{summary}:</strong>
                    {complete}
                  </li>
                );
              })}
            </ol>
          </dd>
        </div>
        <div className="pt-8 lg:grid lg:grid-cols-3 lg:gap-8">
          <dt className="text-base font-semibold leading-7 text-gray-900 lg:col-span-1">
            Example of {item.indefiniteArticle} {item.name.toLowerCase()}
          </dt>
          <dd className="mt-4 lg:col-span-2 lg:mt-0">
            <blockquote className="relative text-base leading-7 text-gray-600 whitespace-pre">
              <div
                className={twMerge(
                  "inline-block",
                  item.name === "Diamante" && "text-center"
                )}
              >
                {item.example.text}
              </div>
            </blockquote>
            <p className="mt-16 uppercase text-sm text-gray-700">
              <span className="text-gray-400">By</span> {item.example.author}
            </p>
          </dd>
        </div>
      </dl>
    </Container>
  );
}
