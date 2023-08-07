import { Container } from "@/components/Container";
import { HeroPattern } from "@/components/HeroPattern";
import { firestore } from "@/utilities/firestore";
import { redirect } from "next/navigation";
import { getServerSession } from "@/utilities/getServerSession";
import { stripe } from "@/utilities/stripe";
import Link from "next/link";
import { CreditsClient } from "./client";
import { FREE_CREDITS } from "@/utilities/constants";

export type Tier = {
  name: string;
  href: string;
  description: string;
  fullPrice: number;
  salePrice: number;
  perPoem: number;
};

const origin =
  process.env.VERCEL_ENV === "preview" &&
  typeof process.env.VERCEL_GIT_COMMIT_REF === "string"
    ? `https://poetry-tips-git-${process.env.VERCEL_GIT_COMMIT_REF}-gregives.vercel.app`
    : "https://www.poetry.tips";

export const metadata = {
  alternates: {
    canonical: "/credits",
  },
};

export default async function CreditsPage() {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (typeof email !== "string") {
    redirect("/");
  }

  const { data: products } = await stripe.products.list();

  const tiers = (
    await Promise.all(
      products.map(async (product) => {
        if (typeof product.default_price !== "string") {
          return;
        }

        const price = await stripe.prices.retrieve(product.default_price);

        const { url: href } = await stripe.checkout.sessions.create({
          customer_email: email,
          success_url: `${origin}/credits`,
          cancel_url: `${origin}/credits`,
          line_items: [
            {
              price: price.id,
              quantity: 1,
            },
          ],
          mode: "payment",
          discounts: [
            {
              coupon: "RElasnMv",
            },
          ],
        });

        if (href === null || price.unit_amount === null) {
          return;
        }

        const fullPrice = price.unit_amount / 100;
        const salePrice = fullPrice / 2;

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

  const {
    docs: [user],
  } = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  const credits: number | "Unlimited" = user.data().credits ?? FREE_CREDITS;

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
