import { LoadingButton } from "@mui/lab";
import { Box, Stack, Typography } from "@mui/material";
import type { NextPage } from "next";
import { CheckIcon } from "../src/components/Icons";

import { Layout, Wrapper } from "../src/components/Layout";
import Link from "../src/components/Link";
import { Post } from "../src/components/Post";

import { usePostsQuery } from "../src/generated/graphql";

const Home: NextPage = () => {
  const limit = 2;
  const { data, fetchMore, loading } = usePostsQuery({
    variables: { limit },
    notifyOnNetworkStatusChange: true
  });

  return (
    <Layout>
      <Wrapper sx={{ display: "flex", mb: 3 }} elevation={0}>
        <Typography component="h1">Posts</Typography>
        <Link
          color="inherit"
          underline="hover"
          href="/post/add"
          sx={{ ml: "auto" }}
        >
          Add post
        </Link>
      </Wrapper>

      <Stack spacing={4} alignItems="center" sx={{ pb: 8 }}>
        {data?.posts.items.map((p) => (
          <Post key={p.id} post={p} />
        ))}
        {data?.posts.pageInfo.hasNextPage ? (
          <LoadingButton
            loading={loading}
            variant="contained"
            onClick={async () => {
              await fetchMore({
                variables: {
                  limit,
                  cursor: data.posts.pageInfo.endCursor
                }
              });
            }}
          >
            Load more
          </LoadingButton>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>There are no posts left</Typography>
            <CheckIcon sx={{ color: (th) => th.palette.success.main }} />
          </Box>
        )}
      </Stack>
    </Layout>
  );
};

export default Home;
