import type { NextAuthOptions } from "next-auth";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { firestore } from "./firestore";
import { track, updateUser } from "./mixpanel";
import { sendEmail } from "./emails";

if (
  process.env.GOOGLE_CLIENT_ID === undefined ||
  process.env.GOOGLE_CLIENT_SECRET === undefined
) {
  throw new Error("Missing Google environment variables");
}

export const authOptions: NextAuthOptions = {
  adapter: FirestoreAdapter(firestore),
  providers: [
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        await sendEmail(identifier, "Welcome to poetry.tips", { url });
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn({ user }) {
      await updateUser(user.id, {
        $name: user.name,
        $email: user.email,
        $avatar: user.image,
        // @ts-ignore
        credits: user.credits,
      });
    },
    async createUser({ user }) {
      await track(user.id, "Signed Up", {
        method: user.name === undefined ? "Email" : "OAuth",
      });
    },
  },
};
