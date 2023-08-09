import { User } from "@/types";
import { sendEmail } from "@/utilities/emails";
import { firestore } from "@/utilities/firestore";
import { isBefore, isYesterday, startOfToday } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const { docs: users } = await firestore
    .collection("users")
    .where("credits", "==", 0)
    .get();

  const emails = users
    .filter((user) => {
      const { poems, emails } = user.data() as User;

      return (
        poems !== undefined &&
        poems.some((poem) => isYesterday(poem.createdAt)) &&
        poems.every((poem) => isBefore(poem.createdAt, startOfToday())) &&
        (emails === undefined ||
          !emails.some(
            (email) => email.subject === "50% off credits at poetry.tips"
          ))
      );
    })
    .map((user) => user.get("email"));

  console.log(emails);

  await sendEmail(emails, "50% off credits at poetry.tips");

  return new NextResponse("Success");
}
