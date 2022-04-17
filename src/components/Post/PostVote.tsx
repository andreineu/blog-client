import React from "react";
import { IconButton, Stack } from "@mui/material";

import { useMeQuery, useVotePostMutation } from "../../generated/graphql";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "../Icons";

import { useSnackbar } from "../../hooks/useSnackbar";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";

import { updatePostVote } from "../../utils/cache/updatePostVote";

interface PostVoteProps {
  authorId: number;
  postId: number;
  voteStatus?: number;
  rating: number;
}

export const PostVote: React.FC<PostVoteProps> = ({
  authorId,
  postId,
  voteStatus = 0,
  rating
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;

  const { addSnackItem } = useSnackbar();

  const { data } = useMeQuery();
  const [vote] = useVotePostMutation();

  const handleVote = async (value: 1 | -1) => {
    if (!data?.me) {
      addSnackItem({ message: "You are not authenticated", severity: "error" });
      return;
    }

    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot vote on your posts",
        severity: "warning"
      });
      return;
    }

    if (voteStatus === value) return;

    await vote({
      variables: { postId, value },
      optimisticResponse: {
        __typename: "Mutation",
        votePost: { message: "voted", voted: true }
      },
      update: (cache) => {
        updatePostVote(cache, value, `Post:${postId}`);
      }
    });
  };

  return (
    <Stack
      alignItems="center"
      gap={0.25}
      sx={[
        !isMobile && { position: "absolute", left: -64, top: 0 },
        isMobile && { flexDirection: "row" }
      ]}
    >
      <IconButton
        color={voteStatus === 1 ? "success" : "inherit"}
        aria-label="upvote"
        data-testid="upvote-button"
        onClick={() => handleVote(1)}
      >
        {!isMobile && <ChevronUpIcon sx={{ width: 18, height: 18 }} />}
        {isMobile && <ArrowUpIcon />}
      </IconButton>
      <div data-testid="rating-counter">{rating}</div>
      <IconButton
        color={voteStatus === -1 ? "error" : "inherit"}
        aria-label="downvote"
        data-testid="downvote-button"
        onClick={() => handleVote(-1)}
      >
        {!isMobile && <ChevronDownIcon sx={{ width: 18, height: 18 }} />}
        {isMobile && <ArrowDownIcon />}
      </IconButton>
    </Stack>
  );
};
