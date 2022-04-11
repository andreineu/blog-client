import React from "react";
import { Container, Paper, PaperProps } from "@mui/material";

export interface WrapperProps extends PaperProps {
  noPadding?: boolean;
  children?: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({
  noPadding = false,
  children,
  sx = {},
  ...props
}) => {
  let paddings = { px: 3, py: 2 };
  if (noPadding) paddings = { px: 0, py: 0 };

  return (
    <Container maxWidth="md" disableGutters>
      <Paper sx={[paddings, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
        {children}
      </Paper>
    </Container>
  );
};
