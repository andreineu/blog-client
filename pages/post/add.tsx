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

import { CommunityField } from "../../src/components/Forms/CommunityAutocomplete";

import { EditorFieldProps } from "../../src/components/Editor";
import { requireAuthentication } from "../../src/hoc/withAuth";

let Editor = dynamic<EditorFieldProps>(
  () => import("../../src/components/Editor").then((mod) => mod.EditorField),
  { ssr: false, loading: () => <p>loading...</p> }
);

type Values = {
  title: string;
  body: OutputBlockData[];
  communityId: number | null;
};

const initialValues: FormikConfig<Values>["initialValues"] = {
  title: "",
  body: [] as OutputData["blocks"],
  communityId: null
};

const validationSchema = yup.object({
  title: yup.string().required().min(3),
  body: yup.array().required().min(1),
  communityId: yup.number().nullable()
});

const AddPage = () => {
  const router = useRouter();
  const [createPost] = useCreatePostMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      const response = await createPost({
        variables: {
          title: values.title,
          body: JSON.stringify(values.body),
          communityId: values.communityId
        },
        update: (cache) => {
          cache.evict({ fieldName: "posts:{}" });
        }
      });
      if (response?.data?.createPost) {
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
          error={formik.touched.title && !!formik.errors.title}
          helperText={formik.touched.title && formik.errors.title}
        />
        <Editor
          onBlur={(e) => {
            e.target.id = "body";
            e.target.name = "body";
            formik.handleBlur(e);
          }}
          error={formik.touched.body && !!formik.errors.body}
          helperText={formik.touched.body && (formik.errors.body as string)}
          onDataChange={onDataChange}
        />
        <CommunityField
          onChange={(_e, community) => {
            console.log(community?.id);
            formik.setFieldValue("communityId", community?.id);
          }}
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

export const getServerSideProps = requireAuthentication(async (ctx) => {
  return { props: {} };
});

export default AddPage;
