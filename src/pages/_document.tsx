import Document, { Head, Html, Main, NextScript } from "next/document";
export default class MyDocument extends Document {
    render() {
      return (
        <Html lang="pt">
          <Head>
            
            <link rel="shortcut icon" href="/favicon.ico" />
            
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
      );
    }
  }