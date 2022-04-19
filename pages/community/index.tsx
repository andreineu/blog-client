import React from "react";

import { useRouter } from "next/router";
import { Box, Button, Grid, Typography } from "@mui/material";

import {
  CommunitySortKeys,
  useCommunitiesQuery
} from "../../src/generated/graphql";

import { Layout } from "../../src/components/Layout";
import { PaginationButton } from "../../src/components/Buttons";
import { CommunityCard } from "../../src/components/Community/Community";
import { CheckIcon } from "../../src/components/Icons";
import { repeat } from "../../src/utils/repeat";
import { CommunitySkeleton } from "../../src/components/Community/CommunitySkeleton";

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
        {loading && !data?.communities
          ? // {true
            repeat(4, (i) => (
              <Grid key={i} item md={6} sm={12}>
                <CommunitySkeleton />
              </Grid>
            ))
          : null}
        {data?.communities.items.map((c) => (
          <Grid key={c.id} item md={6} sm={12}>
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
        {data?.communities && (
          <PaginationButton
            emptyMessage={
              <>
                <Typography>there are no communities left</Typography>
                <CheckIcon sx={{ color: (th) => th.palette.success.main }} />
              </>
            }
            loading={loading}
            onClick={handleFetchMore}
            pageInfo={data?.communities?.pageInfo}
          />
        )}
      </Box>
    </Layout>
  );
};
export default AddPage;
