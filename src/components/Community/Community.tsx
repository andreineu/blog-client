import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SubscribeButton } from "../Buttons";

interface CommuntyProps {
  id: number;
  src: string;
  name: string;
  title: string;
  totalPosts: number;
  totalUsers: number;
  followStatus: number | null;
}

export const CommunityCard: React.FC<CommuntyProps> = ({
  id,
  src,
  name,
  title,
  totalPosts,
  totalUsers,
  followStatus
}) => {
  const tags = ["Lorem", "Ipsum", "Placeholder", "Tag"];
  return (
    <Box sx={{ display: "flex", gap: 2, height: 120 }}>
      <Avatar
        variant="rounded"
        src={src}
        sx={{
          width: 105,
          height: 105
        }}
      />

      <Stack sx={{ position: "relative", alignItems: "flex-start" }}>
        <Link passHref href={`/community/${name}`}>
          <Typography
            variant="subtitle1"
            sx={{
              fontSize: "1.125rem",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" }
            }}
          >
            {title}
          </Typography>
        </Link>
        <Typography variant="body2" color="text.secondary">
          {totalPosts} posts • {totalUsers} followers
        </Typography>
        <Box sx={{ mt: 1, display: "flex", gap: 1.5 }}>
          {tags.map((tag, i) => (
            // <Link key={tag} href="/">
            <Typography
              key={i}
              color="text.secondary"
              variant="body2"
              component="a"
              sx={{
                transition: (theme) =>
                  theme.transitions.create("all", {
                    duration: theme.transitions.duration.standard
                  }),
                cursor: "pointer",
                "&:hover": {
                  color: "text.primary"
                }
              }}
            >
              {tag}
            </Typography>
            // </Link>
          ))}
        </Box>

        <SubscribeButton communityId={id} followStatus={followStatus} />
      </Stack>
    </Box>
  );
};
