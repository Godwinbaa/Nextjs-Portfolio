import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head >
            <link href="https://fonts.googleapis.com/css2?family=Libertinus+Keyboard&family=Outfit:wght@100..900&family=Caveat:wght@400..700&family=Inconsolata:wght@200..900&display=swap" rel="stylesheet"></link>
            

          </Head>
          <body className="antialiased">
            <Main />
            <NextScript />
          </body>
        </Html>
        );
}
