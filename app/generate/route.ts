import { User } from "@/types";
import { FREE_CREDITS } from "@/utilities/constants";
import { firestore } from "@/utilities/firestore";
import { getServerSession } from "@/utilities/getServerSession";
import { redirect } from "next/navigation";

export async function GET() {
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

  const { credits = FREE_CREDITS } = user.data() as User;

  if (credits === 0) {
    redirect("/credits?generate=true");
  } else {
    redirect("/saved?generate=true");
  }
}
