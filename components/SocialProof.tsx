import Image from "next/image";
import { cache } from "react";
import { firestore } from "@/utilities/firestore";
import { twMerge } from "tailwind-merge";

export const revalidate = 3600;

const getNumberOfUsers = cache(async () => {
  const snapshot = await firestore.collection("users").count().get();
  return snapshot.data().count;
});

type SocialProofProperties = {
  className?: string;
};

export async function SocialProof({ className }: SocialProofProperties) {
  const numberOfUsers = await getNumberOfUsers();

  return (
    <div className={twMerge("hidden sm:flex mb-8 justify-center", className)}>
      <div className="-my-2 relative flex items-center rounded-full px-3 py-1 text-sm ring-inset ring-1 ring-gray-900/5 backdrop-blur-md backdrop-saturate-125 backdrop-contrast-125 backdrop-brightness-95">
        <div className="-ml-2 flex -space-x-1 mr-3">
          <Image
            className="relative z-30 inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt=""
            width={24}
            height={24}
          />
          <Image
            className="relative z-20 inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt=""
            width={24}
            height={24}
          />
          <Image
            className="relative z-10 inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.25&w=48&h=48&q=80"
            alt=""
            width={24}
            height={24}
          />
          <Image
            className="relative z-0 inline-block h-6 w-6 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=48&h=48&q=80"
            alt=""
            width={24}
            height={24}
          />
        </div>
        <span className="opacity-80 saturate-50">
          Join more than{" "}
          {(Math.floor(numberOfUsers / 100) * 100).toLocaleString()} poets
        </span>
      </div>
    </div>
  );
}
