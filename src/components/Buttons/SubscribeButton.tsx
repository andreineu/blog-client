import React from "react";
import { ApolloCache, gql } from "@apollo/client";
import { Button, SxProps, Theme } from "@mui/material";

import {
  FollowAction,
  useFollowCommunityMutation,
  useFollowUserMutation
} from "../../generated/graphql";

const updateCommunityStatus = (
  cache: ApolloCache<any>,
  status: 1 | null,
  id: string
) => {
  cache.updateFragment<{
    totalUsers: number;
    followStatus: number | null;
  }>(
    {
      id,
      fragment: gql`
        fragment community on Community {
          totalUsers
          followStatus
        }
      `
    },
    (data) => ({
      totalUsers: data?.totalUsers! + (status || -1),
      followStatus: status
    })
  );
};

const updateUserStatus = (
  cache: ApolloCache<any>,
  status: 1 | null,
  id: string
) => {
  cache.updateFragment<{
    totalFollowers: number;
    followStatus: number | null;
  }>(
    {
      id,
      fragment: gql`
        fragment created on User {
          totalFollowers
          followStatus
        }
      `
    },
    (data) => ({
      totalFollowers: data?.totalFollowers! + (status || -1),
      followStatus: status
    })
  );
};

interface SubscribeButtonProps {
  followStatus: number | null;
  sx?: SxProps<Theme>;
  size?: "small" | "medium" | "large" | undefined;
  userId?: number;
  communityId?: number;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  followStatus,
  size = "small",
  userId,
  communityId,
  sx = {}
}) => {
  const [followUser] = useFollowUserMutation();
  const [followCommunity] = useFollowCommunityMutation();

  const handleClick = async (action: FollowAction) => {
    if (userId) {
      await followUser({
        variables: { action, userId },
        update: (cache) =>
          updateUserStatus(
            cache,
            action === FollowAction.Follow ? 1 : null,
            `User:${userId}`
          )
      });
      return;
    }

    await followCommunity({
      variables: { action, communityId: communityId! },
      update: (cache) =>
        updateCommunityStatus(
          cache,
          action === FollowAction.Follow ? 1 : null,
          `Community:${communityId!}`
        )
    });
  };

  return (
    <>
      {followStatus === 1 ? (
        <Button
          onClick={() => handleClick(FollowAction.Unfollow)}
          size={size}
          sx={sx}
          variant="contained"
          color="secondary"
        >
          Unsubscribe
        </Button>
      ) : (
        <Button
          onClick={() => handleClick(FollowAction.Follow)}
          size={size}
          sx={sx}
          variant="contained"
        >
          Subscribe
        </Button>
      )}
    </>
  );
};
