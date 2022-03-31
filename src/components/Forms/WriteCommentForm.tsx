import React from "react";

import * as yup from "yup";
import { useFormik } from "formik";

import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import {
  CommentsDocument,
  useMeQuery,
  useWriteCommentMutation
} from "../../generated/graphql";
import { useSnackbar } from "../SnackBar";

const validationSchema = yup.object({
  body: yup.string().min(3).required()
});

interface WriteCommentFormProps {
  postId: number;
  parentId?: number;
  afterSubmit?: () => void;
}

export const WriteCommentForm: React.FC<WriteCommentFormProps> = ({
  postId,
  parentId,
  afterSubmit
}) => {
  const [write] = useWriteCommentMutation();
  const { data } = useMeQuery();
  const { addSnackItem } = useSnackbar();
  const loggedIn = !!data?.me;

  const formik = useFormik({
    initialValues: {
      body: ""
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      await write({
        variables: { postId, body: values.body, parentId },
        refetchQueries: [CommentsDocument]
      });
      if (typeof afterSubmit === "function") afterSubmit();
      helpers.setValues({ body: "" });
    }
  });
  const isValid = formik.isValid && formik.touched.body;
  const handleBtnClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    if (isValid) return;
    if (loggedIn) return;
    addSnackItem({ message: "log in first", severity: "error" });
  };
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        multiline
        label="comment..."
        {...formik.getFieldProps("body")}
        error={formik.touched.body && !!formik.errors.body}
        helperText={formik.touched.body && formik.errors.body}
      />
      <Box
        component="span"
        sx={{ display: "inline-block", mt: 2 }}
        onClick={handleBtnClick}
      >
        <LoadingButton
          loading={formik.isSubmitting}
          type="submit"
          variant="contained"
          disabled={!isValid}
        >
          comment
        </LoadingButton>
      </Box>
    </Box>
  );
};
