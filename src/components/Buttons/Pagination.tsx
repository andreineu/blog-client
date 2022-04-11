import { LoadingButton } from "@mui/lab";
import { Box, ButtonProps, Typography } from "@mui/material";
import React from "react";
import { PageInfo } from "../../generated/graphql";
import { CheckIcon } from "../Icons";

interface PaginationProps {
  pageInfo?: PageInfo;
  onClick: () => void;
  loading: boolean;
  buttonProps?: Omit<ButtonProps, "onClick">;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageInfo,
  loading,
  onClick,
  buttonProps = {}
}) => {
  return (
    <>
      {pageInfo?.hasNextPage ? (
        <LoadingButton
          loading={loading}
          variant="contained"
          onClick={onClick}
          {...buttonProps}
        >
          Load more
        </LoadingButton>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography>There are no posts left</Typography>
          <CheckIcon sx={{ color: (th) => th.palette.success.main }} />
        </Box>
      )}
    </>
  );
};
