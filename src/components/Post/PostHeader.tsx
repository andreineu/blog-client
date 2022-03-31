// import { MoreHoriz } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Skeleton,
  Tooltip,
  Typography
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "../Link";
import React from "react";
import { ArrowDownIcon } from "../Icons";

const tooltipProps = {
  tooltip: {
    sx: {
      bgcolor: "background.paper",
      p: 0,
      boxShadow: 14
    }
  },
  arrow: {
    sx: {
      color: "background.paper"
    }
  }
};

interface PostHeaderProps {
  communityId?: string;
  title: string;
  createdAt: string;
  username: string;
  postId: number;
}

export const PostHeader: React.FC<PostHeaderProps> = ({
  // communityId
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
        <Avatar sx={{ height: 20, width: 20 }}>A</Avatar>
        <Link
          // color="whitesmoke"
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
          variant="subtitle1"
          href={`/`}
        >
          {username}
        </Link>

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {formatDistanceToNow(new Date(+createdAt), { addSuffix: true })}
        </Typography>
      </Box>
      <Box>
        <Link
          href={`/post/${postId}`}
          // color="whitesmoke"
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
