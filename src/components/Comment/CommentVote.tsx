import React from "react";
import { Box, IconButton } from "@mui/material";

import { useMeQuery, useVoteCommentMutation } from "../../generated/graphql";
import { ChevronUpIcon, ChevronDownIcon } from "../Icons";
import { useSnackbar } from "../../hooks/useSnackbar";
import { updateCommentVote } from "../../utils/cache/updateCommentVote";

interface CommentVoteProps {
  authorId: number;
  commentId: number;
  voteStatus: number;
  rating: number;
}

export const CommentVote: React.FC<CommentVoteProps> = ({
  authorId,
  commentId,
  voteStatus = 0,
  rating
}) => {
  const { addSnackItem } = useSnackbar();

  const { data, error } = useMeQuery();
  const [vote] = useVoteCommentMutation();

  const handleVote = async (value: 1 | -1) => {
    if (!data?.me) {
      addSnackItem({ message: "You are not authenticated", severity: "error" });
      return;
    }

    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot vote on your comments",
        severity: "warning"
      });
      return;
    }

    if (voteStatus === value) return;

    await vote({
      variables: { commentId, value },
      optimisticResponse: {
        __typename: "Mutation",
        voteComment: { message: "voted", voted: true }
      },
      update: (cache) => {
        updateCommentVote(cache, value, `Comment:${commentId}`);
      }
    });
  };

  return (
    <Box alignItems="center" sx={{ display: "flex" }}>
      <IconButton
        data-testid="upvote-button"
        color={voteStatus === 1 ? "success" : "default"}
        aria-label="upvote"
        onClick={() => handleVote(1)}
      >
        <ChevronUpIcon sx={{ width: 12, height: 12 }} />
      </IconButton>
      {rating}
      <IconButton
        data-testid="downvote-button"
        color={voteStatus === -1 ? "error" : "default"}
        aria-label="downvote"
        onClick={() => handleVote(-1)}
      >
        <ChevronDownIcon sx={{ width: 12, height: 12 }} />
      </IconButton>
    </Box>
  );
};
