import React from "react";
import { Paper, Box, Divider, Typography, SxProps, Theme } from "@mui/material";
import { Wrapper } from ".";
import { WrapperProps } from "./Wrapper";

interface SectionHeaderProps {
  name: string | JSX.Element;
  avatar: JSX.Element;
  actions?: JSX.Element;
  wrapperProps?: WrapperProps;
  sx?: SxProps<Theme>;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  name,
  avatar,
  actions,
  wrapperProps,
  children,
  sx
}) => {
  return (
    <Wrapper noPadding {...wrapperProps} sx={sx}>
      <Paper variant="outlined">
        <Box
          sx={{
            px: 3,
            bgcolor: "background.default",
            height: 140,
            backgroundImage: "radial-gradient(#4c4e51 1px, #0d1117 1px);",
            backgroundSize: "20px 20px"
          }}
        >
          <Box sx={{ position: "relative", top: 70 }}>{avatar}</Box>
        </Box>
        <Divider />
        <Box sx={{ mx: 3, mt: 2, pt: 6, position: "relative" }}>
          <Typography variant="h5" component="h1">
            {name}
          </Typography>
          <Box sx={{ position: "absolute", right: 0, top: 0 }}>{actions}</Box>
          <Divider sx={{ pt: 2 }} />
        </Box>
        <Box sx={{ px: 3, py: 2 }}>{children}</Box>
      </Paper>
    </Wrapper>
  );
};
