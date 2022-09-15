import type { AppProps } from "next/app";
import Head from "next/head";
import { memo, Suspense, useMemo } from "react";
import Layout from "../components/layout";
import Loading from "../components/loader";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const children = useMemo(() => <Component {...pageProps} />, [Component, pageProps]);
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Head>
          <title>DEV</title>
          <meta name="description" content="Development Scratch Playground" />
        </Head>
        <Layout>{children}</Layout>
      </Suspense>
    </>
  );
};

export default memo(MyApp);
