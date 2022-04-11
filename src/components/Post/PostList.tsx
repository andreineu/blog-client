import React, { useEffect, useState } from "react";
import Apollo from "@apollo/client";

import {
  Button,
  Divider,
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Post } from ".";

import {
  PostsQuery,
  PostsQueryVariables,
  SortKeys,
  usePostsQuery
} from "../../generated/graphql";

import { PaginationButton } from "../Buttons";
import { Dropdown } from "../Dropdown";

interface PostListProps {
  options?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>;
}

export const PostList: React.FC<PostListProps> = ({ options }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [limit, setLimit] = useState(options?.variables?.limit);
  const [sortKey, setSortKey] = useState<typeof keys[0]["value"]>(
    SortKeys.CreatedAt
  );

  const { data, loading, error, fetchMore, refetch } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
    ...options
  });

  useEffect(() => {
    refetch({ limit, sortKey });
  }, [sortKey]);

  const handleFetchMore = async () => {
    await fetchMore({
      variables: {
        ...options?.variables,
        limit,
        cursor: data?.posts.pageInfo.endCursor,
        sortKey
      }
    });
  };

  const keys = [
    { label: "Rating", value: SortKeys.Rating },
    { label: "Date", value: SortKeys.CreatedAt }
  ];

  return (
    <>
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        page options
      </Button>
      <Dropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl}>
        <Typography sx={{ px: 1 }}>Sort by</Typography>
        <RadioGroup value={sortKey}>
          {keys.map((key, i) => (
            <FormControlLabel
              onChange={() => {
                console.log(key.value);
                setSortKey(key.value);
              }}
              key={i}
              sx={{ px: 1 }}
              value={key.value}
              control={<Radio />}
              label={key.label}
            />
          ))}
        </RadioGroup>
        <Divider />
        <Typography sx={{ pt: 2, px: 1 }}>Items per page</Typography>
        <TextField
          sx={{ pt: 1, width: 150, fieldset: { border: 0 } }}
          type="number"
          value={limit}
          onChange={(e) => setLimit(+e.target.value)}
        />
      </Dropdown>

      <Stack spacing={4} alignItems="center">
        {error && <Typography>Error ocurred when fetching data</Typography>}
        {loading && !data?.posts && <Typography>loading...</Typography>}
        {data?.posts && (
          <>
            {data?.posts.items.map((p) => (
              <Post key={p.id} post={p} />
            ))}
          </>
        )}
      </Stack>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ my: 4 }}
      >
        <PaginationButton
          loading={loading}
          onClick={handleFetchMore}
          pageInfo={data?.posts?.pageInfo}
        />
      </Box>
    </>
  );
};
