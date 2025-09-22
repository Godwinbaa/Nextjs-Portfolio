import "../styles/globals.css";
import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TvStatic from "@/components/TvStatic";
import { ThemeProvider } from "next-themes";
import ScrollProgressBar from "@/components/ScrollProgressBar";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global UI */}
      <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={true}>
        <ScrollProgressBar/>
        <Cursor />
        {/* <TvStatic /> */}
        <Navbar />

        {/* Page Content */}
        <Component {...pageProps} />

        <Footer />
      </ThemeProvider>
    </>
  );
}
MyApp.getInitialProps = async (appContext) => {
  return {
    pageProps: {},
  };
};
