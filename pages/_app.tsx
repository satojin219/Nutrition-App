import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "swiper/css/bundle";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
