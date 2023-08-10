import { User } from "@/types";
import { sendEmail } from "@/utilities/emails";
import { firestore } from "@/utilities/firestore";
import { isBefore, isYesterday, startOfToday } from "date-fns";
import { NextResponse } from "next/server";

export async function GET() {
  const { docs: users } = await firestore.collection("users").get();

  await Promise.allSettled([
    (async () => {
      const emails = users
        .filter((user) => {
          const { credits, poems, emails } = user.data() as User;

          return (
            credits === 0 &&
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

      console.log("Sending 50% off email");
      console.log(emails);

      await sendEmail(emails, "50% off credits at poetry.tips");
    })(),
    (async () => {
      const emails = users
        .filter((user) => {
          const { credits, poems, emails } = user.data() as User;

          return (
            (credits === 1 || credits === 2 || credits === 3) &&
            poems !== undefined &&
            poems.length < 3 &&
            poems.some((poem) => isYesterday(poem.createdAt)) &&
            poems.every((poem) => isBefore(poem.createdAt, startOfToday())) &&
            (emails === undefined ||
              !emails.some(
                (email) => email.subject === "You've got credits left"
              ))
          );
        })
        .map((user) => user.get("email"));

      console.log("Sending credits left email");
      console.log(emails);

      await sendEmail(emails, "You've got credits left");
    })(),
  ]);

  return new NextResponse("Success");
}
