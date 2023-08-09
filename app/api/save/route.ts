import { Poem, User } from "@/types";
import { FREE_CREDITS } from "@/utilities/constants";
import { firestore } from "@/utilities/firestore";
import { getServerSession } from "@/utilities/getServerSession";
import { track, updateUser } from "@/utilities/mixpanel";
import { FieldValue } from "firebase-admin/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  const email = session?.user?.email;

  if (typeof email !== "string") {
    return;
  }

  const poem: Poem = await request.json();

  const {
    docs: [user],
  } = await firestore
    .collection("users")
    .where("email", "==", email)
    .limit(1)
    .get();

  let { credits = FREE_CREDITS } = user.data() as User;

  if (credits === 0) {
    throw new Error("User has no credits");
  }

  credits = credits === "Unlimited" ? "Unlimited" : credits - 1;

  await track(user.id, "Generated Poem");

  await firestore
    .collection("users")
    .doc(user.id)
    .update({
      credits,
      poems: FieldValue.arrayUnion(poem),
    });

  await updateUser(user.id, {
    credits,
  });

  return new NextResponse("Success");
}
