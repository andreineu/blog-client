import { LoginForm } from "../src/components/Forms";
import { Layout, Wrapper } from "../src/components/Layout";

const LoginPage = () => {
  return (
    <Layout>
      <Wrapper variant="outlined">
        <LoginForm />
      </Wrapper>
    </Layout>
  );
};
export default LoginPage;
