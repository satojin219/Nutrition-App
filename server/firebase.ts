import firebase from "firebase-admin";
import { cert, initializeApp } from "firebase-admin/app";

const app = initializeApp({
  credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIAL as string)),
});
export const db = firebase.firestore(app);
