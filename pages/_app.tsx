import * as React from "react";

import Head from "next/head";
import { AppInitialProps, AppProps } from "next/app";

import { ApolloProvider } from "@apollo/client";
import NextNProgress from "nextjs-progressbar";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { useApollo } from "../src/utils/client";
import { SnackBar } from "../src/components/SnackBar";
import { SnackbarProvider } from "../src/context/snackbarProvider";

import theme from "../src/utils/theme";
import createEmotionCache from "../src/utils/createEmotionCache";

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
          <NextNProgress color={theme.palette.primary.main} height={1} />
          <SnackbarProvider>
            <CssBaseline />
            <Component {...pageProps} />
            <SnackBar />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  );
}
