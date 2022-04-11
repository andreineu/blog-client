import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { formatDistanceToNow } from "date-fns";

import Link from "../Link";

import { CommunityBase } from "../../generated/graphql";
import { CommunityBadge } from "../Community";

interface PostHeaderProps {
  community?: CommunityBase | null;
  title: string;
  createdAt: string;
  username: string;
  avatar?: string;
  postId: number;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  community,
  avatar,
  title,
  createdAt,
  username,
  postId
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          position: "relative"
        }}
      >
        <Avatar sx={{ height: 20, width: 20 }} src={avatar} />
        <Link
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
          variant="subtitle1"
          href={`/user/${username}`}
        >
          {username}
        </Link>

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {formatDistanceToNow(new Date(+createdAt), { addSuffix: true })}
        </Typography>
        {community && <CommunityBadge community={community} />}
      </Box>
      <Box>
        <Link
          href={`/post/${postId}`}
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
          variant="h5"
        >
          {title}
        </Link>
      </Box>
    </>
  );
};
