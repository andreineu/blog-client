import React from "react";
import {
  Avatar,
  Box,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            gap: 1,
            alignItems: "center",
            position: "relative"
          },
          matches && { mb: 1 }
        ]}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar sx={{ height: 32, width: 32 }} src={avatar} />
          <Box
            sx={[
              !matches && {
                display: "flex",
                alignItems: "center",
                gap: 1
              },
              matches && { gap: 0 }
            ]}
          >
            <Link
              sx={{ color: (th) => th.palette.text.primary, fontSize: 20 }}
              underline="hover"
              variant="subtitle1"
              href={`/user/${username}`}
            >
              {username}
            </Link>
            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {formatDistanceToNow(new Date(+createdAt), { addSuffix: true })}
            </Typography>
          </Box>
        </Box>
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
