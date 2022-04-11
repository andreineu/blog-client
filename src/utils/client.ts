import { useMemo } from "react";
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject>;

import { CommunitiesQuery, PostsQuery } from "../generated/graphql";

export const createApolloCache = () =>
  new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          posts: {
            keyArgs: ["$username", "communityName", "sortKey"],
            merge(
              existing: PostsQuery["posts"] | undefined,
              incoming: PostsQuery["posts"]
            ): PostsQuery["posts"] {
              return {
                ...incoming,
                items: [...(existing?.items || []), ...incoming.items]
              };
            }
          },
          communities: {
            keyArgs: [],
            merge(
              existing: CommunitiesQuery["communities"] | undefined,
              incoming: CommunitiesQuery["communities"]
            ): CommunitiesQuery["communities"] {
              return {
                ...incoming,
                items: [...(existing?.items || []), ...incoming.items]
              };
            }
          }
        }
      }
    }
  });

export const createApolloClient = (ctx?: any) => {
  let cookie = "";
  if (typeof window === "undefined") {
    cookie = ctx?.req?.headers?.cookie;
  }
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: new HttpLink({
      uri: "http://localhost:4000/graphql",
      credentials: "include",
      headers: { cookie } || undefined
    }),
    cache: createApolloCache(),
    connectToDevTools: true
  });
};

export function initializeApollo(initialState = null, ctx: any) {
  const _apolloClient = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        )
      ]
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any, ctx?: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(state, ctx), [state, ctx]);
  return store;
}
