import { getApps, cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

if (getApps().length === 0) {
  const credEscaped = JSON.parse(process.env.FIREBASE_CREDENTIAL as string);
  initializeApp({
    credential: cert({
      ...credEscaped,
      privateKey: credEscaped.private_key.replace(/\\n/g, "\n"), // PEMの改行文字がJSONから文字列にするときにエスケープされてしまう。エスケープをここで解除する。
    }),
  });
}

export const db = getFirestore();
