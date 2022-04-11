import { Box, Divider, Fade, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

import { Comment as CommentType } from "../../generated/graphql";
import { TreeItem } from "../../utils/tree";

import { CommentForm } from "./CommentForm";
import { CommentHead } from "./CommentHead";
import { ToggleComment } from "./ToggleComment";

interface CommentProps {
  comment: CommentType | TreeItem<CommentType>;
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  const hasChildren = "children" in comment && comment.children.length >= 1;
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          pl: 3,
          pt: 2,
          position: "relative"
        }}
      >
        <CommentHead
          avatar={comment.author.avatar || ""}
          authorId={comment.author.id}
          voteStatus={comment.voteStatus || 0}
          commentId={comment.id}
          createdAt={comment.createdAt}
          username={comment.author.username}
          rating={comment.rating}
        />
        <Box>
          <Typography variant="body2">{comment.body}</Typography>
        </Box>
        <CommentForm commentId={comment.id} postId={comment.postId} />
        {hasChildren && <CommentChildren comments={comment.children} />}
      </Paper>
    </>
  );
};

interface CommentChildrenProps {
  comments: TreeItem<CommentType>[];
}

const CommentChildren: React.FC<CommentChildrenProps> = ({ comments }) => {
  const [open, setOpen] = useState(true);
  const handleToggle = () => setOpen((p) => !p);

  return (
    <>
      <Box>
        <ToggleComment isActive={open} toggleState={handleToggle} />

        <Fade in={!open} unmountOnExit>
          <Typography color="primary" variant="caption" sx={{ ml: 1 }}>
            open thread
          </Typography>
        </Fade>
      </Box>
      <Box sx={{ position: "relative" }}>
        <Box
          onClick={handleToggle}
          sx={{
            position: "absolute",
            zIndex: 10,
            px: 1,
            left: 0,
            top: 0,
            bottom: 0,
            "&:hover": {
              cursor: "pointer"
            },
            "&:hover>hr": {
              borderColor: (th) => th.palette.primary.main
            }
          }}
        >
          <Divider
            orientation="vertical"
            sx={{
              transition: (theme) =>
                theme.transitions.create("all", {
                  duration: theme.transitions.duration.short
                })
            }}
          />
        </Box>
        {open ? comments.map((c) => <Comment key={c.id} comment={c} />) : null}
      </Box>
    </>
  );
};
