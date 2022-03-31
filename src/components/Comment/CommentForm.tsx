import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useMeQuery } from "../../generated/graphql";
import { WriteCommentForm } from "../Forms";
import { useSnackbar } from "../SnackBar";

interface CommentFormProps {
  postId: number;
  commentId: number;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postId,
  commentId
}) => {
  const [open, setOpen] = useState(false);
  const { addSnackItem } = useSnackbar();
  const { data } = useMeQuery();
  let handleToggle = () => setOpen((p) => !p);
  if (!data?.me)
    handleToggle = () =>
      addSnackItem({ message: "Login first", severity: "warning" });
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          color: "primary.main",
          cursor: "pointer",
          "&:hover": { textDecoration: "underline" }
        }}
        onClick={handleToggle}
      >
        {!open ? "Reply" : "Close"}
      </Typography>
      {open && (
        <Box sx={{ pr: 3 }}>
          <WriteCommentForm
            postId={postId}
            parentId={commentId}
            afterSubmit={handleToggle}
          />
        </Box>
      )}
    </Box>
  );
};
