import React from "react";
import { Container, SxProps, Theme } from "@mui/material";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export const Layout: React.FC<LayoutProps> = ({ children, sx = {} }) => {
  return (
    <>
      <Header />
      <Container
        maxWidth="md"
        sx={[{ mt: 4, mx: "auto" }, ...(Array.isArray(sx) ? sx : [sx])]}
      >
        {children}
      </Container>
    </>
  );
};
