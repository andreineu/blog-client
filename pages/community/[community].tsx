import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import React from "react";
import { AvatarInput } from "../../src/components/Avatar";
import { SubscribeButton } from "../../src/components/Buttons";
import { SettingsIcon } from "../../src/components/Icons";

import { Layout, SectionHeader } from "../../src/components/Layout";

import { PostList } from "../../src/components/Post";

import {
  CommunityDocument,
  CommunityQuery,
  CommunityQueryVariables,
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  useCommunityQuery,
  useMeQuery
} from "../../src/generated/graphql";

import { addApolloState, initializeApollo } from "../../src/utils/client";

const limit = 4;

const UserPage = () => {
  const router = useRouter();
  const name = router.query.community as string;
  const { data: meData } = useMeQuery();
  const { data } = useCommunityQuery({ variables: { name } });

  const community = data!.community!;
  const isAdmin = meData?.me?.id === community.authorId;
  console.log(community);
  let avatar = (
    <Avatar
      variant="square"
      sx={{ height: 128, width: 128 }}
      src={community.avatar || ""}
    />
  );

  let actions = (
    <SubscribeButton
      communityId={community.id}
      followStatus={community.followStatus || null}
    />
  );
  if (isAdmin) {
    avatar = (
      <AvatarInput
        variant="square"
        communityId={community.id}
        src={community.avatar || ""}
      />
    );
    actions = (
      <IconButton>
        <SettingsIcon sx={{ height: 18, width: 18 }} />
      </IconButton>
    );
  }
  return (
    <Layout>
      <SectionHeader
        sx={{ mb: 4 }}
        name={community.name}
        avatar={avatar}
        actions={actions}
      >
        <Typography>
          created{" "}
          {formatDistanceToNow(new Date(+community.createdAt), {
            addSuffix: true
          })}
        </Typography>

        <Divider sx={{ my: 2 }} />
        <Typography>Rules:</Typography>

        <Typography>{community.rules}</Typography>
        <Divider sx={{ my: 2 }} />

        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction="row"
          spacing={3}
        >
          <Stack alignItems="center">
            <Typography variant="h6">{community.totalUsers} </Typography>
            <Typography>followers</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="h6">{community.totalPosts}</Typography>
            <Typography>posts</Typography>
          </Stack>
        </Stack>
      </SectionHeader>

      <PostList options={{ variables: { limit, communityName: name } }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);
  const name = ctx.params!.community as string;

  const { data } = await apolloClient.query<
    CommunityQuery,
    CommunityQueryVariables
  >({
    query: CommunityDocument,
    variables: {
      name
    }
  });

  await apolloClient.query<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    variables: {
      limit,
      communityName: name
    }
  });

  if (!data.community) return { redirect: { destination: "/not-found" } };

  return addApolloState(apolloClient, { props: {} });
};

export default UserPage;
