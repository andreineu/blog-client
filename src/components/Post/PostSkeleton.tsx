import { Skeleton } from "@mui/material";
import React from "react";
import { Wrapper } from "../Layout";

interface PostSkeletonProps {}

export const PostSkeleton: React.FC<PostSkeletonProps> = ({}) => {
  return (
    <Wrapper variant="outlined">
      <Skeleton height="36px" />
      <Skeleton width="80%" />
      <Skeleton width="80%" />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
    </Wrapper>
  );
};
