import * as yup from "yup";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { MeDocument, MeQuery, useLoginMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

let validationSchema = yup.object({
  usernameOrEmail: yup.string().required("username or email is required"),
  password: yup.string().required().min(3)
});
interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      usernameOrEmail: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      const response = await login({
        variables: values,
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            data: { me: data?.login.user },
            query: MeDocument
          });
          cache.evict({ fieldName: "posts:{}" });
        }
      });
      if (response.data?.login.errors) {
        helpers.setErrors(toErrorMap(response.data?.login.errors));
      } else {
        router.push("/");
      }
    }
  });
  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        m: "auto",
        px: 3,
        py: 2
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
        disabled={!(Object.keys(formik.touched).length !== 0 && formik.isValid)}
      >
        Login
      </LoadingButton>
    </Box>
  );
};
