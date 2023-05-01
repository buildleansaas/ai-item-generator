"use client";

import { poems } from "@/poems";
import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { LogIn } from "./LogIn";
import { useRouter } from "next/navigation";
import { Options } from "@/types";

export function PoemGenerator({
  type,
}: {
  type?: (typeof poems)[number]["name"];
}) {
  const poem = poems.find((poem) => poem.name === type) ?? poems[0];

  const [logInOpen, setLogInOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const typeId = useId();
  const promptId = useId();

  const { register, handleSubmit } = useForm<Options>({
    defaultValues: {
      type: type ?? "Random Poem",
      prompt: "",
    },
  });

  const generatePoem = handleSubmit((options) => {
    localStorage.setItem("options", JSON.stringify(options));

    if (session) {
      router.push("/saved?generate=true");
    } else {
      setLogInOpen(true);
    }
  });

  return (
    <form className="mx-auto max-w-4xl space-y-8" onSubmit={generatePoem}>
      <div>
        <label
          htmlFor={typeId}
          className="flex items-center text-sm font-medium leading-6 text-gray-900"
        >
          <span
            className={twMerge(
              "inline-block rounded-full w-6 h-6 text-center mr-3",
              poem.classNames.background
            )}
          >
            1
          </span>
          Select the type of poem
        </label>
        <select
          id={typeId}
          className="mt-4 block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-800"
          required
          {...register("type", {
            required: true,
          })}
        >
          <option>Random Poem</option>
          {poems.map((poem) => (
            <option key={poem.name}>{poem.name}</option>
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
              poem.classNames.background
            )}
          >
            2
          </span>
          Describe your poem
        </label>
        <div className="relative mt-4">
          <div className="absolute left-0 top-0 py-3 px-4 text-gray-900 pointer-events-none">
            Write a poem about
          </div>
          <textarea
            rows={4}
            id={promptId}
            className="indent-[15.25ch] block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 resize-none"
            placeholder="a knight in shining armour"
            required
            {...register("prompt", {
              required: true,
            })}
          />
        </div>
      </div>
      <button
        className={twMerge(
          "block w-full rounded-xl py-3 px-4 font-medium focus:outline-none focus-visible:ring-2 hover:brightness-95 hover:saturate-150",
          poem.classNames.background,
          poem.classNames.title,
          poem.classNames.focusVisible
        )}
      >
        Generate poem
      </button>
      <LogIn
        open={logInOpen}
        onClose={() => setLogInOpen(false)}
        callbackUrl="/saved?generate=true"
      />
    </form>
  );
}