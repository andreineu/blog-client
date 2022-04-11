import React from "react";
import * as yup from "yup";

import { useRouter } from "next/router";

import { FormikConfig, useFormik } from "formik";

import { LoadingButton } from "@mui/lab";
import { Paper, Typography, TextField } from "@mui/material";

import { Layout } from "../../src/components/Layout";

import { useCreateCommunityMutation } from "../../src/generated/graphql";
import { requireAuthentication } from "../../src/hoc/withAuth";

type Values = {
  name: string;
  rules: string;
  summary: string;
};

const initialValues: FormikConfig<Values>["initialValues"] = {
  name: "",
  rules: "",
  summary: ""
};

const validationSchema = yup.object({
  name: yup.string().required().min(3),
  rules: yup.string().required().min(10),
  summary: yup.string().required().min(10)
});

const AddPage = () => {
  const router = useRouter();
  const [createCommunity] = useCreateCommunityMutation();
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, _helpers) => {
      const response = await createCommunity({
        variables: values,

        update: (cache) => {
          cache.evict({ fieldName: "communities:{}" });
        }
      });
      if (response?.data?.createCommunity) {
        router.push("/");
      }
    }
  });

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
          Create community
        </Typography>
        <TextField
          fullWidth
          placeholder="name"
          label="name"
          {...formik.getFieldProps("name")}
          error={formik.touched.name && !!formik.errors.name}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          placeholder="summary"
          label="summary"
          {...formik.getFieldProps("summary")}
          error={formik.touched.summary && !!formik.errors.summary}
          helperText={formik.touched.summary && formik.errors.summary}
        />
        <TextField
          fullWidth
          placeholder="rules"
          label="rules"
          {...formik.getFieldProps("rules")}
          error={formik.touched.rules && !!formik.errors.rules}
          helperText={formik.touched.rules && formik.errors.rules}
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
