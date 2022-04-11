import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import {
  formatDistanceToNow,
  formatDuration,
  intervalToDuration
} from "date-fns";
import { GetServerSideProps } from "next";

import { useRouter } from "next/router";
import React from "react";
import { AvatarInput } from "../../src/components/Avatar";
import { SubscribeButton } from "../../src/components/Buttons";
import { SettingsIcon } from "../../src/components/Icons";

import { Layout, SectionHeader, Wrapper } from "../../src/components/Layout";

import { PostList } from "../../src/components/Post";

import {
  PostsDocument,
  PostsQuery,
  PostsQueryVariables,
  useMeQuery,
  UserDocument,
  UserQuery,
  UserQueryVariables,
  useUserQuery
} from "../../src/generated/graphql";
import { addApolloState, initializeApollo } from "../../src/utils/client";

const limit = 4;

const UserPage = () => {
  const router = useRouter();
  const username = router.query.username as string;
  const { data: meData } = useMeQuery();
  const { data } = useUserQuery({ variables: { username } });

  const user = data?.user!;
  const isCurrentUser = meData?.me?.id === user.id;
  let avatar = (
    <Avatar sx={{ height: 128, width: 128 }} src={user.avatar || ""} />
  );
  let actions = (
    <SubscribeButton
      userId={user.id}
      size="large"
      followStatus={user.followStatus || null}
    >
      Subscribe
    </SubscribeButton>
  );
  if (isCurrentUser) {
    avatar = <AvatarInput src={user.avatar || ""} userId={user.id} />;
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
        name={user.username}
        avatar={avatar}
        actions={actions}
      >
        <Typography>
          registered{" "}
          {formatDistanceToNow(new Date(+user.createdAt), {
            addSuffix: true
          })}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack
          divider={<Divider orientation="vertical" flexItem />}
          direction="row"
          spacing={3}
        >
          <Stack alignItems="center">
            <Typography variant="h6">{user.rating} </Typography>
            <Typography>rating</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="h6">{user.totalFollowers} </Typography>
            <Typography>followers</Typography>
          </Stack>
          <Stack alignItems="center">
            <Typography variant="h6">{user.totalPosts}</Typography>
            <Typography>posts</Typography>
          </Stack>
        </Stack>
      </SectionHeader>

      <PostList options={{ variables: { limit, username } }} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);
  const username = ctx.params!.username as string;

  await apolloClient.query<UserQuery, UserQueryVariables>({
    query: UserDocument,
    variables: {
      username
    }
  });
  await apolloClient.query<PostsQuery, PostsQueryVariables>({
    query: PostsDocument,
    variables: {
      limit,
      username
    }
  });

  return addApolloState(apolloClient, { props: {} });
};

export default UserPage;
