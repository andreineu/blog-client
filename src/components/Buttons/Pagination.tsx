import { LoadingButton } from "@mui/lab";
import { Box, ButtonProps } from "@mui/material";
import React from "react";
import { PageInfo } from "../../generated/graphql";

interface PaginationProps {
  pageInfo?: PageInfo;
  onClick: () => void;
  loading: boolean;
  emptyMessage: React.ReactNode;
  buttonProps?: Omit<ButtonProps, "onClick">;
}

export const PaginationButton: React.FC<PaginationProps> = ({
  pageInfo,
  loading,
  onClick,
  emptyMessage,
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
          {emptyMessage}
        </Box>
      )}
    </>
  );
};
