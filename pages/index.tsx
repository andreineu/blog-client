import { ApolloClient } from "@apollo/client";
import {
  Typography,
  Box,
  Paper,
  Button,
  alpha,
  ButtonProps,
  Radio,
  FormControlLabel,
  RadioGroup,
  Divider,
  TextField
} from "@mui/material";
import type { NextPage } from "next";
import { useState } from "react";

import { SettingsIcon } from "../src/components/Icons";

import { Layout, Wrapper } from "../src/components/Layout";
import { Dropdown } from "../src/components/Dropdown";
import Link from "../src/components/Link";
import { PostList } from "../src/components/Post";
import { SortKeys } from "../src/generated/graphql";

const StyledButton = ({ sx = {}, ...rest }: ButtonProps) => (
  <Button
    variant="contained"
    color="secondary"
    {...rest}
    sx={[
      { bgcolor: (th) => alpha(th.palette.secondary.dark, 0.5) },
      ...(Array.isArray(sx) ? sx : [sx])
    ]}
  />
);

const Home: NextPage = () => {
  const limit = 4;
  return (
    <Layout>
      <PostList options={{ variables: { limit } }} />
    </Layout>
  );
};

export default Home;
