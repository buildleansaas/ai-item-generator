import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { ItemResult } from "@/components/ItemResult";
import { firestore } from "@/utilities/firestore";
import { redirect } from "next/navigation";
import { ItemCard } from "@/components/ItemCard";
import { getServerSession } from "@/utilities/getServerSession";
import { Item } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function SavedPage() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (typeof email !== "string") {
    redirect("/");
  }

  const {
    docs: [user],
  } = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  const savedItems: Item[] = user.data().items ?? [];

  return (
    <Container className="pt-16 pb-24">
      <div className="fixed inset-[-50%] -z-10 bg-gray-100" />
      <HeroPattern className="bg-gradient-to-br from-blue-50 to-blue-100" />
      <h1 className="text-3xl/snug sm:text-4xl/snug font-bold tracking-tight mb-4">
        Generated items
      </h1>
      {savedItems.length > 0 && (
        <p>
          Here’s all the items that you’ve generated.{" "}
          <Link
            href="/"
            className="text-blue-600 rounded-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-gray-800"
          >
            Generate another?
          </Link>
        </p>
      )}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 peer">
        {user.data().credits !== 0 && <ItemResult />}
        {savedItems
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((savedItem) => (
            <ItemCard key={savedItem.response} item={savedItem}>
              {savedItem.response}
            </ItemCard>
          ))}
      </div>
      <div className="relative hidden peer-empty:block text-center rounded-3xl px-6 py-12 border-2 border-dashed border-gray-300 hover:border-gray-400">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
          No items
        </h3>
        <p className="mt-4 text-sm text-gray-500">
          Get started by generating a item for free.
        </p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center rounded-xl py-3 px-4 font-medium bg-gradient-to-br from-indigo-400 to-indigo-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span className="absolute inset-0"></span>
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            Generate item
          </Link>
        </div>
      </div>
    </Container>
  );
}
