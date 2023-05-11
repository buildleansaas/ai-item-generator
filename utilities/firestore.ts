import { initFirestore } from "@next-auth/firebase-adapter";
import { ServiceAccount, cert } from "firebase-admin/app";

import serviceAccount from "@/firebase-admin-service-key.json";

if (!serviceAccount) {
  throw new Error("Missing Firebase environment variables");
}

export const firestore = initFirestore({
  credential: cert(serviceAccount as ServiceAccount),
});
