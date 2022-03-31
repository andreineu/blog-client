import { Box, BoxProps, Paper, PaperProps } from "@mui/material";
import * as React from "react";

interface WrapperProps extends PaperProps {
  noPadding?: boolean;

  size?: "small" | "medium";
  children?: React.ReactNode;
  transparent?: boolean;
}

export const Wrapper: React.FC<WrapperProps> = ({
  noPadding = false,
  transparent = false,
  size = "medium",
  children,
  sx,

  ...props
}) => {
  const width = size === "small" ? 600 : 800;

  let paddings = { px: 3, py: 2 };
  if (noPadding) paddings = { px: 0, py: 0 };

  return (
    <Paper
      sx={{
        m: "auto",
        width,
        position: "relative",
        ...paddings,
        ...sx
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
