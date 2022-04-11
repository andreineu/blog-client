import { useRouter } from "next/router";

import { RegisterForm, RegisterFormSubmitFn } from "../src/components/Forms";
import { Layout, Wrapper } from "../src/components/Layout";

import {
  MeDocument,
  MeQuery,
  useRegisterMutation
} from "../src/generated/graphql";
import { toErrorMap } from "../src/utils/toErrorMap";

const RegisterPage = () => {
  const router = useRouter();
  const [register] = useRegisterMutation();

  const handleSubmit: RegisterFormSubmitFn = async (values, helpers) => {
    const { data } = await register({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          data: { me: data?.register.user },
          query: MeDocument
        });
      }
    });
    if (data?.register.errors) {
      helpers.setErrors(toErrorMap(data?.register.errors));
    } else {
      router.push("/");
    }
  };
  return (
    <Layout>
      <Wrapper variant="outlined">
        <RegisterForm onSubmit={handleSubmit} />
      </Wrapper>
    </Layout>
  );
};
export default RegisterPage;
