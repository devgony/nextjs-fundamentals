import NavBar from "../components/NavBar";
import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <style jsx global>
        {`
          a {
            color: pink;
          }
        `}
      </style>
    </>
  );
}
