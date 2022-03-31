import React from "react";
import * as yup from "yup";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { FormikConfig, useFormik } from "formik";
import { OutputBlockData, OutputData } from "@editorjs/editorjs";

import { LoadingButton } from "@mui/lab";
import { Paper, Typography, TextField } from "@mui/material";

import { Layout } from "../../src/components/Layout";

import { useCreatePostMutation } from "../../src/generated/graphql";
import { CustomEditorProps } from "../../src/components/Editor/CustomEditor";

let CustomEditor = dynamic<CustomEditorProps>(
  () => import("../../src/components/Editor").then((mod) => mod.CustomEditor),
  { ssr: false }
);

type Values = {
  title: string;
  body: OutputBlockData[];
};

const initialValues: FormikConfig<Values>["initialValues"] = {
  title: "",
  body: [] as OutputData["blocks"]
};

const validationSchema = yup.object({
  title: yup.string().min(3),
  body: yup.array().min(1)
});

const AddPage = () => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();
  const formik = useFormik({
    initialValues,

    validationSchema,
    onSubmit: async (values, _helpers) => {
      const response = await createPost({
        variables: {
          title: values.title,
          body: JSON.stringify(values.body)
        },

        update: (cache) => {
          cache.evict({ fieldName: "posts:{}" });
        }
      });
      if (response?.data?.create) {
        router.push("/");
      }
    }
  });
  const onDataChange = (data: OutputData) => {
    formik.setFieldValue("body", data.blocks);
  };
  return (
    <Layout>
      <Paper
        onClick={() => console.log(formik.values)}
        variant="outlined"
        component={"form"}
        onSubmit={formik.handleSubmit}
        sx={{
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          m: "auto",
          px: 3,
          py: 2
        }}
      >
        <Typography variant="h4" component="h1">
          Add Post
        </Typography>
        <TextField
          fullWidth
          placeholder="title"
          label="title"
          {...formik.getFieldProps("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <CustomEditor
          onBlur={(e) => {
            e.target.id = "body";
            e.target.name = "body";
            formik.handleBlur(e);
          }}
          error={formik.touched.body && Boolean(formik.errors.body)}
          helperText={formik.touched.body && (formik.errors.body as string)}
          onDataChange={onDataChange}
        />
        <LoadingButton
          variant="contained"
          loading={formik.isSubmitting}
          type="submit"
          disabled={!formik.isValid}
        >
          Add
        </LoadingButton>
      </Paper>
    </Layout>
  );
};
export default AddPage;
