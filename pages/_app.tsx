import type { AppProps } from "next/app";
import Head from "next/head";
import { memo, useMemo } from "react";
import Layout from "../components/layout";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const children = useMemo(() => <Component {...pageProps} />, [Component, pageProps]);
  return (
    <>
      <Head>
        <title>DEV</title>
        <meta name="description" content="Development Scratch Playground" />
      </Head>
      <Layout>{children}</Layout>
    </>
  );
};

export default memo(MyApp);
