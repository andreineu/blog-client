import { useRouter } from "next/router";

import { LoginForm, LoginFormSubmitFn } from "../src/components/Forms";
import { Layout, Wrapper } from "../src/components/Layout";

import {
  MeDocument,
  MeQuery,
  useLoginMutation
} from "../src/generated/graphql";

import { toErrorMap } from "../src/utils/toErrorMap";

const LoginPage = () => {
  const router = useRouter();
  const [login] = useLoginMutation();

  const submitHandler: LoginFormSubmitFn = async (values, helpers) => {
    const { data } = await login({
      variables: values,
      update: (cache, { data }) => {
        cache.writeQuery<MeQuery>({
          data: { me: data?.login.user },
          query: MeDocument
        });
        cache.evict({ fieldName: "posts:{}" });
      }
    });
    if (data?.login.errors) {
      helpers.setErrors(toErrorMap(data?.login.errors));
    } else if (typeof router.query.next === "string") {
      router.push(router.query.next);
    } else {
      router.push("/");
    }
  };
  return (
    <Layout>
      <Wrapper variant="outlined">
        <LoginForm onSubmit={submitHandler} />
      </Wrapper>
    </Layout>
  );
};
export default LoginPage;
