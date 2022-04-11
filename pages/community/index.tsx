import React from "react";

import { useRouter } from "next/router";
import { Box, Button, Grid } from "@mui/material";

import {
  CommunitySortKeys,
  useCommunitiesQuery
} from "../../src/generated/graphql";

import { Layout } from "../../src/components/Layout";
import { PaginationButton } from "../../src/components/Buttons";
import { CommunityCard } from "../../src/components/Community/Community";

const initialLimit = 10;

const AddPage = () => {
  const router = useRouter();

  const { data, fetchMore, loading } = useCommunitiesQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: initialLimit }
  });

  const handleFetchMore = async () => {
    await fetchMore({
      variables: {
        limit: initialLimit,
        cursor: data?.communities.pageInfo.endCursor,
        sortKey: CommunitySortKeys.CreatedAt
      }
    });
  };

  return (
    <Layout>
      <Grid container spacing={2}>
        {data?.communities.items.map((c) => (
          <Grid key={c.id} item xs={6}>
            <CommunityCard
              id={c.id}
              followStatus={c.followStatus || null}
              src={c.avatar || ""}
              name={c.name}
              title={c.name}
              totalPosts={c.totalPosts}
              totalUsers={c.totalUsers}
            />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" alignItems="center" my={4}>
        <PaginationButton
          loading={loading}
          onClick={handleFetchMore}
          pageInfo={data?.communities?.pageInfo}
        />
      </Box>
    </Layout>
  );
};
export default AddPage;
