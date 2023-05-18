import { initFirestore } from "@next-auth/firebase-adapter";
import { ServiceAccount, cert } from "firebase-admin/app";

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY as string);

if (!serviceAccount) throw new Error("Missing Firebase environment variables");

export const firestore = initFirestore({
  credential: cert(serviceAccount as ServiceAccount),
});
