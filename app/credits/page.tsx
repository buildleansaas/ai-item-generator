import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { firestore } from "@/utilities/firestore";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utilities/getServerSession";
import { stripe } from "@/utilities/stripe";
import Link from "next/link";
import { CreditsClient } from "./client";
import { BASE_ORIGIN, FREE_CREDITS } from "@/utilities/constants";
import { User } from "@/types";
import { isBefore, startOfToday } from "date-fns";

export type Tier = {
  name: string;
  href: string;
  description: string;
  fullPrice: number;
  salePrice: number;
  perPoem: number;
};

export const metadata = {
  alternates: {
    canonical: "/credits",
  },
};

export default async function CreditsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (typeof email !== "string") {
    redirect("/");
  }

  const { data: products } = await stripe.products.list();

  const {
    docs: [user],
  } = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  const { credits = FREE_CREDITS, poems } = user.data() as User;

  const shouldOfferDiscount =
    credits === 0 &&
    poems !== undefined &&
    poems.every((poem) => isBefore(poem.createdAt, startOfToday()));

  const tiers = (
    await Promise.all(
      products.map(async (product) => {
        if (typeof product.default_price !== "string") {
          return;
        }

        const price = await stripe.prices.retrieve(product.default_price);

        const { url: href } = await stripe.checkout.sessions.create({
          customer_email: email,
          success_url:
            searchParams.generate === "true"
              ? `${BASE_ORIGIN}/generate`
              : `${BASE_ORIGIN}/credits`,
          cancel_url: `${BASE_ORIGIN}/credits`,
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: "payment",
          ...(shouldOfferDiscount && {
            discounts: [
              {
                coupon: "RElasnMv",
              },
            ],
          }),
        });

        if (href === null || price.unit_amount === null) {
          return;
        }

        const fullPrice = price.unit_amount / 100;
        const salePrice = shouldOfferDiscount ? fullPrice / 2 : fullPrice;

        return {
          name: product.name,
          href,
          description: product.description,
          fullPrice,
          salePrice,
          perPoem:
            product.metadata.credits === "Unlimited"
              ? 0
              : salePrice / parseInt(product.metadata.credits, 10),
        };
      })
    )
  )
    .filter((tier): tier is Tier => tier !== undefined)
    .sort((a, b) => b.perPoem - a.perPoem);

  return (
    <Container className="pt-16 pb-24">
      <HeroPattern className="bg-gradient-to-br from-green-50 to-green-100" />
      <h1 className="text-3xl/snug sm:text-4xl/snug font-bold tracking-tight mb-4">
        {credits === 0
          ? "You've ran out of credits"
          : `You've got ${credits.toLocaleString().toLowerCase()} credits`}
      </h1>
      <p>
        {credits !== 0 ? (
          <>
            <Link
              href="/"
              className="text-green-600 rounded-lg focus:outline-none focus-visible:outline-2 focus-visible:outline-gray-800"
            >
              Why not generate a poem?
            </Link>{" "}
            {credits !== "Unlimited" && "Or top your credits up below."}
          </>
        ) : (
          "If you want to generate any more poems, you'll need to buy some more credits below."
        )}
      </p>
      <CreditsClient
        className="mt-8 sm:mt-12"
        disabled={credits === "Unlimited"}
        tiers={tiers}
      />
    </Container>
  );
}
