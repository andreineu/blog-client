import { Box, Skeleton } from "@mui/material";
import React from "react";

interface CommunitySkeletonProps {}

export const CommunitySkeleton: React.FC<CommunitySkeletonProps> = ({}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, height: 120 }}>
      <Skeleton
        sx={{ height: 105, width: 105, borderRadius: 1 }}
        variant="rectangular"
      />
      <Box>
        <Skeleton width="24ch" />
        <Box sx={{ display: "flex", gap: 1 }}>
          <Skeleton width="10ch" />
          <Skeleton width="10ch" />
        </Box>
        <Skeleton width="20ch" />
        <Skeleton width="14ch" height="36px" />
      </Box>
    </Box>
  );
};
