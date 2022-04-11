import React from "react";

import { formatDistanceToNow } from "date-fns";

import { Avatar, Box, Typography } from "@mui/material";
import Link from "../Link";
import { CommentVote } from "./CommentVote";

interface CommentHeadProps {
  avatar?: string;
  authorId: number;
  username: string;
  rating: number;
  createdAt: string;
  commentId: number;
  voteStatus: number;
}

export const CommentHead: React.FC<CommentHeadProps> = ({
  avatar,
  authorId,
  username,
  createdAt,
  rating,
  commentId,
  voteStatus
}) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CommentVote
          authorId={authorId}
          voteStatus={voteStatus}
          commentId={commentId}
          rating={rating}
        />
        <Link href={`/user/${username}`}>
          <Avatar
            sx={{ height: 20, width: 20, cursor: "pointer" }}
            src={avatar}
          />
        </Link>
        <Link
          href={`/user/${username}`}
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
        >
          {username}
        </Link>

        <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
          {formatDistanceToNow(new Date(+createdAt), {
            addSuffix: true
          })}
        </Typography>
      </Box>
    </>
  );
};
