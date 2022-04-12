import * as React from "react";
import { useRouter } from "next/router";

import { useApolloClient } from "@apollo/client";

import {
  Avatar,
  Box,
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Divider,
  MenuItem,
  alpha,
  Typography,
  Skeleton
} from "@mui/material";

import Link from "../Link";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { Wrapper } from ".";
import { Dropdown } from "../Dropdown";
import { GroupIcon, LogoutIcon, PlusIcon } from "../Icons";

interface HideOnScrollProps {
  children: React.ReactElement;
}

const HideOnScroll: React.FC<HideOnScrollProps> = ({ children }) => {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

const UserButtons: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const router = useRouter();
  const apolloClient = useApolloClient();

  const { data, loading, error } = useMeQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
  };

  const loggedIn = data?.me && !loading && !error;
  if (loading)
    return (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Skeleton width={64} variant="text" />
        <Skeleton width={40} height={40} variant="circular" />
      </Box>
    );
  if (!loggedIn)
    return (
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
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Link
        href={`/user/${data.me?.username}`}
        sx={{ color: (th) => th.palette.text.primary }}
        underline="hover"
      >
        {data.me?.username}
      </Link>

      <Avatar
        src={data.me?.avatar || ""}
        sx={{ cursor: "pointer" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Dropdown
        elevation={0}
        PaperProps={{
          sx: {
            border: 1,
            borderColor: "divider",
            svg: { mr: 1, width: 18, height: 18 }
          }
        }}
        MenuListProps={{ sx: { fontSize: 10 } }}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      >
        <MenuItem onClick={() => router.push("/post/add")}>
          <PlusIcon />
          <Typography variant="body2">Add post</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => router.push("/community/add")}>
          <GroupIcon />
          Create community
        </MenuItem>
        <Divider />

        <MenuItem onClick={handleLogout}>
          <LogoutIcon />
          Logout
        </MenuItem>
      </Dropdown>
    </Box>
  );
};

const StyledLink: React.FC<{ href: string }> = (props) => {
  const router = useRouter();
  return (
    <Link
      sx={[
        {
          display: "block",
          p: 2.5,
          color: (th) => th.palette.text.primary,
          transition: (th) => th.transitions.create("all"),
          "&:hover": {
            color: (th) => th.palette.primary.light,
            bgcolor: (th) => alpha(th.palette.primary.dark, 0.5)
          }
        },
        router.asPath === props.href && {
          borderBottom: 2,
          borderColor: (th) => th.palette.primary.main
        }
      ]}
      underline="none"
      {...props}
    />
  );
};

export const Header = () => {
  return (
    <>
      <HideOnScroll>
        <AppBar elevation={0}>
          <Toolbar disableGutters>
            <Wrapper
              noPadding
              elevation={0}
              sx={{
                px: 3,
                height: 64,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <StyledLink href="/">Main page</StyledLink>
              <StyledLink href="/community">Communities</StyledLink>
              <Box display="flex" gap={4}>
                <UserButtons />
              </Box>
            </Wrapper>
          </Toolbar>
          <Divider />
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
};
