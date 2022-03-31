import * as React from "react";
import Head from "next/head";
import { AppInitialProps, AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/utils/theme";
import createEmotionCache from "../src/utils/createEmotionCache";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../src/utils/client";
import { SnackBar, SnackbarProvider } from "../src/components/SnackBar";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps & AppInitialProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps);
  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
            <SnackBar />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
