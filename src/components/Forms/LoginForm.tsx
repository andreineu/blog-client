import * as yup from "yup";

import { FormikConfig, useFormik } from "formik";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { LoginMutationVariables } from "../../generated/graphql";

type LoginFormValues = LoginMutationVariables;

export type LoginFormSubmitFn = FormikConfig<LoginFormValues>["onSubmit"];

let initialValues: LoginFormValues = {
  usernameOrEmail: "",
  password: ""
};

let validationSchema = yup.object({
  usernameOrEmail: yup.string().required("username or email is required"),
  password: yup.string().required().min(3)
});

interface LoginFormProps {
  onSubmit: LoginFormSubmitFn;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
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
        Login
      </Typography>
      <TextField
        fullWidth
        label="Username or Email"
        {...formik.getFieldProps("usernameOrEmail")}
        error={
          formik.touched.usernameOrEmail && !!formik.errors.usernameOrEmail
        }
        helperText={
          formik.touched.usernameOrEmail && formik.errors.usernameOrEmail
        }
      />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...formik.getFieldProps("password")}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      />
      <LoadingButton
        loading={formik.isSubmitting}
        type="submit"
        variant="contained"
        disabled={!formik.isValid}
      >
        Login
      </LoadingButton>
    </Box>
  );
};
