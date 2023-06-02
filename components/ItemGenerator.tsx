"use client";

import { items } from "@/items";
import { useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSession } from "next-auth/react";
import { LogIn } from "./LogIn";
import { useRouter } from "next/navigation";
import { Options } from "@/types";
import { Loading } from "./Loading";

export function ItemGenerator({ type }: { type?: (typeof items)[number]["name"] }) {
  const [generating, setGenerating] = useState(false);
  const [logInOpen, setLogInOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const typeId = useState("typeId")[0];
  const promptId = useState("promptId")[0];

  const [formValues, setFormValues] = useState<Options>({
    type: type ?? "Weekend Getaway",
    prompt: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const generateItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("options", JSON.stringify(formValues));

    if (session) {
      setGenerating(true);
      router.push("/generate");
    } else {
      setLogInOpen(true);
    }
  };

  const { type: selectedType } = formValues;

  const item = useMemo(
    () =>
      items.filter((item) => {
        console.log(item.name, selectedType);
        return item.name === selectedType;
      })[0] ?? items.filter((item) => item.name === "Weekend Getaway")[0],
    [selectedType]
  );

  console.log(item);

  return (
    <form className="mx-auto max-w-4xl space-y-8" onSubmit={generateItem}>
      <div>
        <label htmlFor={typeId} className="flex items-center text-sm font-medium leading-6 text-gray-900">
          <span className={twMerge("inline-block rounded-full w-6 h-6 text-center mr-3", item.classNames.background)}>
            1
          </span>
          What kind of trip are you trying to plan?
        </label>
        <select
          id={typeId}
          name="type"
          onChange={handleChange}
          value={formValues.type}
          className="mt-4 block w-full rounded-xl border-0 py-3 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-800"
          required
        >
          {items.map((item) => (
            <option key={item.name}>{item.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={promptId} className="flex items-center text-sm font-medium leading-6 text-gray-900">
          <span className={twMerge("inline-block rounded-full w-6 h-6 text-center mr-3", item.classNames.background)}>
            2
          </span>
          Describe your item
        </label>
        <div className="relative mt-4">
          <textarea
            rows={8}
            id={promptId}
            name="prompt"
            onChange={handleChange}
            value={formValues.prompt}
            className="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-800 resize-none"
            placeholder={item.example}
            required
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
          Generate my {item.name} {session && <span className="font-normal opacity-80">(1 credit)</span>}
        </span>
      </button>
      <LogIn open={logInOpen} onClose={() => setLogInOpen(false)} callbackUrl="/generate" />
    </form>
  );
}
