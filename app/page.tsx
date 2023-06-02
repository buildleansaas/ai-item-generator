"use client";

import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { ItemGenerator } from "@/components/ItemGenerator";
import TypeWriter from "@/components/Typewriter";
import { items } from "@/items";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function HomePage() {
  return (
    <Container className="pt-16 pb-24">
      <HeroPattern />
      <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        <div className="-my-2 relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-inset ring-1 ring-gray-900/5 backdrop-blur-lg backdrop-saturate-150">
          More than 1,000 Itineraries Generated
        </div>
      </div>
      <div className="sm:text-center max-w-2xl mx-auto">
        <h1 className="font-bold tracking-tight text-gray-800 mb-8 sm:mb-12 lg:mb-16">
          <span className="text-4xl/snug sm:text-5xl/snug md:text-6xl/snug">
            Let&apos;s Plan Your
          </span>
          <br />
          <TypeWriter phrases={[...items.map((item) => item.name)]} />
        </h1>
      </div>
      <ItemGenerator />
      <div className="mt-24 sm:mt-32 rounded-lg grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div
            key={item.name}
            className={twMerge(
              "group relative p-6 focus-within:outline focus-within:outline-2 rounded-3xl",
              item.classNames.focusWithin,
              item.classNames.background
            )}
          >
            <h2
              className={twMerge(
                "text-xl/snug font-semibold tracking-tight leading-6 pr-10",
                item.classNames.title
              )}
            >
              <Link href={item.href} className="focus:outline-none">
                <span className="absolute inset-0" aria-hidden="true" />
                {item.name}
              </Link>
            </h2>
            <p
              className={twMerge(
                "mt-6 text-sm opacity-80 saturate-50",
                item.classNames.title
              )}
            >
              {item.description}
            </p>
            <span
              className={twMerge(
                "pointer-events-none absolute right-6 top-6 opacity-30 group-hover:opacity-60",
                item.classNames.title
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
    </Container>
  );
}
