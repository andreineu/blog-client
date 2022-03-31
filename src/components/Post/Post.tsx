import React from "react";
import { Divider } from "@mui/material";

import { Post as PostType } from "../../generated/graphql";

import { PostVote } from "./PostVote";
import { Wrapper } from "../Layout";
import { PostHeader } from "./PostHeader";
import { PostBody } from "./PostBody";

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Wrapper
      variant="outlined"
      onClick={() => console.log(post)}
      sx={{
        position: "relative",
        img: {
          maxWidth: "100%"
        }
      }}
    >
      <PostHeader
        createdAt={post.createdAt}
        title={post.title}
        username={post.author.username}
        postId={post.id}
      />
      <Divider sx={{ mx: -3, my: 2 }} />
      <PostBody body={post.body} />
      <PostVote
        authorId={post.author.id}
        rating={post.rating}
        postId={post.id}
        voteStatus={post.voteStatus || 0}
      />
    </Wrapper>
  );
};
