import { initFirestore } from "@next-auth/firebase-adapter";
import { ServiceAccount, cert } from "firebase-admin/app";

const {
  FIREBASE_CLIENT_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
} = process.env;

const serviceAccount = {
  type: "service_account",
  project_id: FIREBASE_PROJECT_ID,
  private_key_id: FIREBASE_PRIVATE_KEY_ID,
  private_key: FIREBASE_PRIVATE_KEY,
  client_email: `firebase-adminsdk-jmz97@${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
  client_id: FIREBASE_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-jmz97%40${FIREBASE_PROJECT_ID}.iam.gserviceaccount.com`,
  universe_domain: "googleapis.com",
};

if (
  !FIREBASE_CLIENT_ID ||
  !FIREBASE_PRIVATE_KEY ||
  !FIREBASE_PRIVATE_KEY_ID ||
  !FIREBASE_PROJECT_ID
)
  throw new Error("Missing Firebase environment variables");

export const firestore = initFirestore({
  credential: cert(serviceAccount as ServiceAccount),
});
