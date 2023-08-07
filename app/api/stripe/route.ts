/// <reference types="stripe-event-types" />
import { FREE_CREDITS } from "@/utilities/constants";
import { firestore } from "@/utilities/firestore";
import { track, updateUser } from "@/utilities/mixpanel";
import { stripe } from "@/utilities/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (process.env.STRIPE_ENDPOINT_SECRET === undefined) {
  throw new Error("Missing Stripe endpoint secret");
}

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");

  const event = stripe.webhooks.constructEvent(
    await request.text(),
    // @ts-expect-error
    signature,
    process.env.STRIPE_ENDPOINT_SECRET
  ) as Stripe.DiscriminatedEvent;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.customer_email === null) {
      throw new Error(`Checkout session ${session.id} has no customer email`);
    }

    const {
      data: [purchase],
    } = await stripe.checkout.sessions.listLineItems(session.id);

    if (purchase?.price?.product === undefined) {
      throw new Error(
        `Product does not exist on checkout session ${session.id}`
      );
    }

    const product =
      typeof purchase.price.product === "string"
        ? await stripe.products.retrieve(purchase.price.product)
        : purchase.price.product;

    if (product.deleted) {
      throw new Error(`Product ${product.id} has been deleted`);
    }

    const {
      docs: [user],
    } = await firestore
      .collection("users")
      .where("email", "==", session.customer_email)
      .limit(1)
      .get();

    const numberOfCredits =
      product.metadata.credits === "Unlimited"
        ? "Unlimited"
        : parseInt(product.metadata.credits, 10);

    await track(user.id, "Bought Credits", {
      Number: numberOfCredits,
    });

    const credits =
      numberOfCredits === "Unlimited"
        ? "Unlimited"
        : (user.data().credits ?? FREE_CREDITS) + numberOfCredits;

    await firestore.collection("users").doc(user.id).update({
      credits,
    });

    await updateUser(user.id, {
      credits,
    });
  }

  return new NextResponse("Success");
}
