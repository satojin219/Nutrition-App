import { getApps, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

console.log("app1", getApps());

if (getApps().length === 0) {
  const c = JSON.parse(process.env.FIREBASE_CREDENTIAL as string);
  initializeApp({
    credential: cert({
      ...c,
      privateKey: c.private_key.replace(/\\n/g, "\n"),
    }),
  });
}

export const db = getFirestore();
