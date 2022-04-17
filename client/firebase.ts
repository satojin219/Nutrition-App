import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiCrR174NccNDI6L_isFDuLXRby72A-zY",
  authDomain: "nutrition-app-886b0.firebaseapp.com",
  projectId: "nutrition-app-886b0",
  storageBucket: "nutrition-app-886b0.appspot.com",
  messagingSenderId: "509703696072",
  appId: "1:509703696072:web:306d3772eb79e0cda3bffd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
