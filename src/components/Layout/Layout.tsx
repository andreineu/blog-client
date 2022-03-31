import * as React from "react";
import { Container } from "@mui/material";
import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container sx={{ mt: 4 }}>{children}</Container>
    </>
  );
};
