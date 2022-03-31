import React from "react";
import { ApolloCache, gql } from "@apollo/client";
import { IconButton, Stack } from "@mui/material";

import { useMeQuery, useVotePostMutation } from "../../generated/graphql";
import { ArrowDownIcon, ArrowUpIcon } from "../Icons";
import { useSnackbar } from "../SnackBar";

interface PostVoteProps {
  authorId: number;
  postId: number;
  voteStatus?: number;
  rating: number;
}

const updateVote = (cache: ApolloCache<any>, voteValue: number, id: string) => {
  cache.updateFragment<{
    rating: number;
    voteStatus: number | null;
  }>(
    {
      id,
      fragment: gql`
        fragment myPost on Post {
          rating
          voteStatus
        }
      `
    },
    (data) => ({
      rating: data?.rating! + voteValue,
      voteStatus: data?.voteStatus! + voteValue || null
    })
  );
};

export const PostVote: React.FC<PostVoteProps> = ({
  authorId,
  postId,
  voteStatus = 0,
  rating
}) => {
  const { addSnackItem } = useSnackbar();
  const { data } = useMeQuery();
  const [vote] = useVotePostMutation();

  const isLoggedIn = !!data?.me;

  const handleUpvote = async () => {
    if (!isLoggedIn) {
      addSnackItem({ message: "You are not authenticated", severity: "error" });
      return;
    }
    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot upvote your post",
        severity: "warning"
      });
      return;
    }
    if (voteStatus === 1) return;
    await vote({
      variables: { postId, value: 1 },
      update: (cache) => {
        updateVote(cache, 1, `Post:${postId}`);
      }
    });
  };
  const handleDownvote = async () => {
    if (!isLoggedIn) {
      addSnackItem({ message: "You are not authenticated", severity: "error" });
      return;
    }
    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot downvote your post",
        severity: "warning"
      });
      return;
    }
    if (voteStatus === -1) return;
    await vote({
      variables: { postId, value: -1 },
      update: (cache) => {
        updateVote(cache, -1, `Post:${postId}`);
      }
    });
  };
  return (
    <Stack
      alignItems="center"
      gap={0.25}
      sx={{ position: "absolute", left: -64, top: 0 }}
    >
      <IconButton
        color={voteStatus === 1 ? "success" : "default"}
        aria-label="upvote"
        onClick={handleUpvote}
      >
        <ArrowUpIcon sx={{ width: 18, height: 18 }} />
      </IconButton>
      {rating}
      <IconButton
        color={voteStatus === -1 ? "error" : "default"}
        aria-label="downvote"
        onClick={handleDownvote}
      >
        <ArrowDownIcon sx={{ width: 18, height: 18 }} />
      </IconButton>
    </Stack>
  );
};
