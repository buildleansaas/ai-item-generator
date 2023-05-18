"use client";

import { items } from "@/items";
import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { LogIn } from "./LogIn";
import { useRouter } from "next/navigation";
import { Options } from "@/types";
import { Loading } from "./Loading";

export function ItemGenerator({
  type,
}: {
  type?: (typeof items)[number]["name"];
}) {
  const [generating, setGenerating] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const typeId = useId();
  const promptId = useId();

  const { register, handleSubmit } = useForm<Options>({
    defaultValues: { type: type ?? "Random Item", prompt: "" },
  });

  const generateItem = handleSubmit((options) => {
    localStorage.setItem("options", JSON.stringify(options));

    if (session) {
      setGenerating(true);
      router.push("/generate");
    } else {
      setLogInOpen(true);
    }
  });

  const item = items.find((item) => item.name === type) ?? items[0];

  return (
    <form className="mx-auto max-w-4xl space-y-8" onSubmit={generateItem}>
      <div>
        <label
          htmlFor={typeId}
          className="flex items-center text-sm font-medium leading-6 text-gray-900"
        >
          <span
            className={twMerge(
              "inline-block rounded-full w-6 h-6 text-center mr-3",
              item.classNames.background
            )}
          >
            1
          </span>
          What kind of trip are you trying to plan?
        </label>
        <select
          id={typeId}
          className="mt-4 block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-800"
          required
          {...register("type", {
            required: true,
          })}
        >
          <option>Random Itinerary</option>
          {items.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label
          htmlFor={promptId}
          className="flex items-center text-sm font-medium leading-6 text-gray-900"
        >
          <span
            className={twMerge(
              "inline-block rounded-full w-6 h-6 text-center mr-3",
              item.classNames.background
            )}
          >
            2
          </span>
          Describe your item
        </label>
        <div className="relative mt-4">
          <textarea
            rows={8}
            id={promptId}
            className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 resize-none"
            placeholder={item.example}
            required
            {...register("prompt", { required: true })}
          />
        </div>
      </div>
      <button
        className={twMerge(
          "flex w-full justify-center items-center space-x-4 rounded-xl py-3 px-4 font-medium focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 hover:brightness-95 hover:saturate-150",
          item.classNames.background,
          item.classNames.title,
          item.classNames.focusVisible
        )}
      >
        {generating && <Loading />}
        <span>
          Generate my {item.name}{" "}
          {session && (
            <span className="font-normal opacity-80">(1 credit)</span>
          )}
        </span>
      </button>
      <LogIn
        open={logInOpen}
        onClose={() => setLogInOpen(false)}
        callbackUrl="/generate"
      />
    </form>
  );
}
