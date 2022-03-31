import React from "react";
import { ApolloCache, gql } from "@apollo/client";
import { Box, IconButton } from "@mui/material";

import { useMeQuery, useVoteCommentMutation } from "../../generated/graphql";
import { ArrowUpIcon, ArrowDownIcon } from "../Icons";
import { useSnackbar } from "../SnackBar";

interface CommentVoteProps {
  authorId: number;
  commentId: number;
  voteStatus: number;
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
        fragment myComment on Comment {
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

export const CommentVote: React.FC<CommentVoteProps> = ({
  authorId,
  commentId,
  voteStatus = 0,
  rating
}) => {
  const [vote] = useVoteCommentMutation();
  const { data } = useMeQuery();
  const { addSnackItem } = useSnackbar();
  const handleUpvote = async () => {
    if (!data?.me) {
      addSnackItem({ message: "To vote login first", severity: "error" });
      return;
    }
    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot upvote your comment",
        severity: "warning"
      });
      return;
    }
    if (voteStatus === 1) return;
    await vote({
      variables: { commentId, value: 1 },
      update: (cache) => {
        updateVote(cache, 1, `Comment:${commentId}`);
      }
    });
  };

  const handleDownvote = async () => {
    if (!data?.me) {
      addSnackItem({ message: "To vote login first", severity: "error" });
      return;
    }
    if (authorId === data.me?.id) {
      addSnackItem({
        message: "You cannot downvote your comment",
        severity: "warning"
      });
      return;
    }
    if (voteStatus === -1) return;
    await vote({
      variables: { commentId, value: -1 },
      update: (cache) => {
        updateVote(cache, -1, `Comment:${commentId}`);
      }
    });
  };
  return (
    <Box alignItems="center" sx={{ display: "flex" }}>
      <IconButton
        color={voteStatus === 1 ? "success" : "default"}
        aria-label="upvote"
        onClick={handleUpvote}
      >
        <ArrowUpIcon sx={{ width: 12, height: 12 }} />
      </IconButton>
      {rating}
      <IconButton
        color={voteStatus === -1 ? "error" : "default"}
        aria-label="downvote"
        onClick={handleDownvote}
      >
        <ArrowDownIcon sx={{ width: 12, height: 12 }} />
      </IconButton>
    </Box>
  );
};
