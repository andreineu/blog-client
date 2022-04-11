import { IconButton } from "@mui/material";
import { MinusIcon, PlusIcon } from "../Icons";
import React from "react";

interface ToggleCommentProps {
  isActive: boolean;
  toggleState: () => void;
}

export const ToggleComment: React.FC<ToggleCommentProps> = ({
  isActive,
  toggleState
}) => {
  return (
    <IconButton
      onClick={toggleState}
      disableRipple
      sx={[
        {
          svg: { width: 14, height: 14 },
          p: 0.25,
          borderRadius: 0.5,
          border: 1,
          transition: (theme) =>
            theme.transitions.create("all", {
              duration: theme.transitions.duration.short
            })
        },
        !isActive && {
          color: (theme) => theme.palette.common.white,
          bgcolor: (theme) => theme.palette.primary.main,
          borderColor: (theme) => theme.palette.primary.main,
          "&:hover": {}
        },
        isActive && {
          borderColor: (theme) => theme.palette.grey[800],
          color: (theme) => theme.palette.grey[800],
          "&:hover": {
            borderColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.main
          }
        }
      ]}
    >
      {isActive ? <MinusIcon /> : <PlusIcon />}
    </IconButton>
  );
};
