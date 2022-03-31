import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import useScrollTrigger from "@mui/material/useScrollTrigger";

import Slide from "@mui/material/Slide";
import { Box, Button, Container, CssBaseline } from "@mui/material";
import Link from "../Link";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export const Header = (props: {}) => {
  const { data, loading, error } = useMeQuery();
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const logoutHandler = async () => {
    await logout();
    await apolloClient.resetStore();
  };
  let C;
  if (data?.me && !loading && !error) {
    C = (
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Typography>Logged in as {data.me.username}</Typography>
        <Button onClick={logoutHandler}>Logout</Button>
      </Box>
    );
  } else {
    C = (
      <>
        <Link
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
          href="/login"
        >
          Auth
        </Link>
        <Link
          sx={{ color: (th) => th.palette.text.primary }}
          underline="hover"
          href="/register"
        >
          Register
        </Link>
      </>
    );
  }
  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          elevation={0}
          variant="outlined"
          sx={{
            bgcolor: "background.paper",
            border: 0,
            borderBottom: 1,
            borderColor: "divider"
          }}
        >
          <Toolbar>
            <Container sx={{ display: "flex" }}>
              <Link
                sx={{ color: (th) => th.palette.text.primary }}
                underline="hover"
                href="/"
              >
                Scroll to Hide App Bar
              </Link>

              <Box display="flex" gap={4} sx={{ ml: "auto" }}>
                {C}
              </Box>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
