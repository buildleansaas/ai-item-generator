"use client";

import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import type { Tier } from "./page";
import { twMerge } from "tailwind-merge";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type CreditsClientProperties = JSX.IntrinsicElements["div"] & {
  disabled?: boolean;
  tiers: Tier[];
};

export function CreditsClient({
  disabled = false,
  tiers,
  className,
  ...properties
}: CreditsClientProperties) {
  const [selected, setSelected] = useState(tiers[0] as Tier);

  return (
    <div
      className={twMerge(
        "grid grid-cols-1 gap-8 sm:grid-cols-2",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
      {...properties}
    >
      <RadioGroup value={selected} onChange={setSelected} disabled={disabled}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-6">
          {tiers.map((tier) => (
            <RadioGroup.Option
              key={tier.name}
              value={tier}
              className={({ active }) =>
                twMerge(
                  active
                    ? "border-green-600 ring-2 ring-green-600"
                    : "border-gray-300",
                  "relative flex justify-between cursor-pointer rounded-xl border bg-white px-6 py-4 shadow-sm focus:outline-none"
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <div className="space-y-2">
                    <RadioGroup.Label
                      as="div"
                      className="font-medium text-gray-900"
                    >
                      {tier.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="div"
                      className="text-sm text-gray-500"
                    >
                      ${tier.perPoem.toFixed(2)} per poem
                    </RadioGroup.Description>
                  </div>
                  <RadioGroup.Description
                    as="div"
                    className="font-medium text-gray-900"
                  >
                    {tier.salePrice < tier.fullPrice && (
                      <s className="text-gray-300 blur-[0.5px]">
                        ${tier.fullPrice.toString().replace(/\.(\d)$/, ".$10")}
                      </s>
                    )}{" "}
                    <span className="text-xl ml-1">
                      ${tier.salePrice.toString().replace(/\.(\d)$/, ".$10")}
                    </span>
                  </RadioGroup.Description>
                  <div
                    className={twMerge(
                      active ? "border" : "border-2",
                      checked ? "border-green-600" : "border-transparent",
                      "pointer-events-none absolute -inset-px rounded-xl"
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
      <div>
        <dl className="space-y-4 pt-2 text-sm font-medium">
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>${selected.fullPrice.toFixed(2)}</dd>
          </div>
          {selected.salePrice < selected.fullPrice && (
            <div className="flex items-center justify-between">
              <dt className="text-gray-600">
                Discount{" "}
                <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  50% off
                </span>
              </dt>
              <dd>
                -$
                {(selected.fullPrice - selected.salePrice).toFixed(2)}
              </dd>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">${selected.salePrice.toFixed(2)}</dd>
          </div>
        </dl>
        <div className="flex justify-end mt-6">
          <a
            href={disabled ? undefined : selected.href}
            role="link"
            aria-disabled={disabled}
            className="inline-flex items-center rounded-xl py-3 px-4 font-medium bg-gradient-to-br from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-lg shadow-green-500/20 border-b-2 border-b-black/20 focus:outline-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus:outline-green-600"
          >
            Continue
            <ArrowRightIcon
              className="-mr-0.5 ml-1.5 h-5 w-5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
