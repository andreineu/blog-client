import * as yup from "yup";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { Box, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {
  MeDocument,
  MeQuery,
  useRegisterMutation
} from "../../generated/graphql";

import { toErrorMap } from "../../utils/toErrorMap";

let validationSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(4)
});

export const RegisterForm = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      email: ""
    },
    validationSchema,
    onSubmit: async (values, helpers) => {
      const response = await register({
        variables: values,
        update: (cache, { data }) => {
          cache.writeQuery<MeQuery>({
            data: { me: data?.register.user },
            query: MeDocument
          });
        }
      });
      const fieldErrors = response.data?.register.errors;
      if (fieldErrors) {
        helpers.setErrors(toErrorMap(fieldErrors));
        console.log(fieldErrors);
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
