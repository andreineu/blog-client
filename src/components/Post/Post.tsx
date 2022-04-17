import React from "react";
import { Box, Divider, Typography } from "@mui/material";

import { Post as PostType } from "../../generated/graphql";

import { PostVote } from "./PostVote";
import { Wrapper } from "../Layout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";

import Link from "../Link";
import { CommentIcon } from "../Icons";

const StyledBox: React.FC = (props) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 3,
      mx: -3,
      mb: -2,
      borderRadius: 1,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      px: 3,
      py: 2,
      color: "text.secondary",
      bgcolor: (th) => th.palette.background.default
    }}
  >
    {props.children}
  </Box>
);

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Wrapper variant="outlined" sx={{ position: "relative" }}>
      <PostHeader
        community={post.community}
        avatar={post.author.avatar || ""}
        createdAt={post.createdAt}
        title={post.title}
        username={post.author.username}
        postId={post.id}
      />

      <Divider sx={{ mx: -3, my: 2 }} />

      <PostBody body={post.body} />

      <Divider sx={{ mx: -3 }} />

      <StyledBox>
        <PostVote
          authorId={post.author.id}
          rating={post.rating}
          postId={post.id}
          voteStatus={post.voteStatus || 0}
        />
        <Link
          color="inherit"
          underline="none"
          href={`post/${post.id}`}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer"
          }}
        >
          <CommentIcon sx={{ width: 18, height: 18 }} /> {post.totalComments}
        </Link>
      </StyledBox>
    </Wrapper>
  );
};
