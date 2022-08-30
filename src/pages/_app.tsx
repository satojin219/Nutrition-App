import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";
import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../../context/AuthContext";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Component {...pageProps} />
    </RecoilRoot>
  );
};

export default MyApp;
