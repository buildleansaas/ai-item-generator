import { poemTypesWithoutRandom } from "@/poems";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export function PoemTypes() {
  return (
    <div className="rounded-lg grid sm:grid-cols-2 gap-4">
      {poemTypesWithoutRandom.map((poemType) => (
        <div
          key={poemType.name}
          className={twMerge(
            "group relative p-6 focus-within:outline focus-within:outline-2 rounded-3xl",
            poemType.classNames.focusWithin,
            poemType.classNames.background,
            poemType.classNames.shadow
          )}
        >
          <h2
            className={twMerge(
              "text-xl/snug font-semibold tracking-tight pr-10",
              poemType.classNames.title
            )}
          >
            <Link href={poemType.href} className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              {poemType.name} Generator
            </Link>
          </h2>
          <p
            className={twMerge(
              "mt-6 text-sm opacity-80 saturate-50",
              poemType.classNames.title
            )}
          >
            {poemType.description}
          </p>
          <span
            className={twMerge(
              "pointer-events-none absolute right-6 top-6 opacity-30 group-hover:opacity-60",
              poemType.classNames.title
            )}
            aria-hidden="true"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  );
}
