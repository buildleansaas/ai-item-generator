import { items } from "@/items";
import { ItineraryItem } from "@/types";
import { twMerge } from "tailwind-merge";

type CallToActionProperties = {
  type?: ItineraryItem["name"];
};

export function CallToAction({ type }: CallToActionProperties) {
  const item = items.find((item) => item.name === type) ?? {
    ...items[0],
    name: "Itinerary",
    href: "/",
  };

  return (
    <div
      className={twMerge(
        "relative isolate -mx-4 sm:mx-0 my-16 sm:rounded-3xl overflow-hidden px-6 py-16 sm:py-24 text-center",
        item.classNames.title
      )}
    >
      <div
        className={twMerge(
          "absolute -z-10 inset-0 opacity-50",
          item.classNames.background
        )}
      />
      <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
        Generate {item.indefiniteArticle} {item.name.toLowerCase()} in seconds
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-lg leading-8 opacity-80">
        Automatically generate {item.name.toLowerCase()}s in seconds using
        artificial intelligence. Just let us know where you wanna go, what you
        wanna do and we will take care of the rest!
      </p>
      <div className="mt-10 flex justify-center">
        <a
          href={item.href}
          className={twMerge(
            "relative rounded-xl bg-white py-3 px-4 font-medium focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:opacity-75",
            item.classNames.focusVisible
          )}
        >
          <span className="absolute inset-0 rounded-xl shadow-xl shadow-current ring-2 ring-current opacity-5 saturate-200"></span>
          Get started for free
        </a>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] opacity-75 saturate-200"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#fff" />
            <stop offset={1} stopColor="currentColor" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
