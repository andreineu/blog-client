import * as yup from "yup";

import { FormikConfig, useFormik } from "formik";

import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { RegisterMutationVariables } from "../../generated/graphql";

type RegisterFormValues = RegisterMutationVariables;

export type RegisterFormSubmitFn = FormikConfig<RegisterFormValues>["onSubmit"];

let initialValues: RegisterFormValues = {
  username: "",
  password: "",
  email: ""
};

let validationSchema = yup.object({
  username: yup
    .string()
    .matches(/^\S*$/, "no spaces!")
    .trim("The username cannot include leading and trailing spaces")
    .min(3, "The username needs to be at least 3 char")
    .max(20, "The contact name cannot exceed 20 char")
    .required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(4)
});

interface RegisterFormProps {
  onSubmit: RegisterFormSubmitFn;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2
      }}
    >
      <Typography variant="h5" component="h1">
        Register
      </Typography>
      <TextField
        fullWidth
        label="email"
        {...formik.getFieldProps("email")}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />
      <TextField
        fullWidth
        label="username"
        {...formik.getFieldProps("username")}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <LoadingButton
        loading={formik.isSubmitting}
        type="submit"
        variant="contained"
        disabled={!(Object.keys(formik.touched).length !== 0 && formik.isValid)}
      >
        Register
      </LoadingButton>
    </Box>
  );
};
