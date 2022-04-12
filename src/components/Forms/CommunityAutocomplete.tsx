import {
  Autocomplete,
  Avatar,
  Box,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

import {
  Community as CommunityType,
  useCommunitiesLazyQuery
} from "../../generated/graphql";

interface CommunityFieldProps {
  onChange: (
    _e: React.SyntheticEvent<Element, Event>,
    comm: Community | null
  ) => void;
}

type Community = {
  id: number;
  name: string;
  avatar?: string | null;
  totalPosts: number;
  totalUsers: number;
} & Partial<CommunityType>;

export const CommunityField: React.FC<CommunityFieldProps> = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<readonly Community[]>([]);
  const loading = open && options.length === 0;

  const [getCommunities] = useCommunitiesLazyQuery({
    variables: { limit: 50 }
  });
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        const { data, error } = await getCommunities();
        if (error || !data?.communities.items) return;

        setOptions(data.communities.items);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, getCommunities]);
  return (
    <Autocomplete
      fullWidth
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Box
          key={option.id}
          component="li"
          {...props}
          sx={{ p: 1, display: "flex", alignItems: "center", gap: 2 }}
        >
          <Avatar sx={{ height: 64, width: 64 }} src={option.avatar || ""} />
          <Box>
            <Typography
              variant="subtitle1"
              sx={{ textDecoration: "underline" }}
            >
              {option.name}
            </Typography>
            <Box>
              {option.totalPosts} posts * {option.totalUsers} users
            </Box>
          </Box>
        </Box>
      )}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Community(optional)"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? "loading..." : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
    />
  );
};
