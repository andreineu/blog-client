import { RegisterForm } from "../src/components/Forms";
import { Layout, Wrapper } from "../src/components/Layout";

const RegisterPage = () => {
  return (
    <Layout>
      <Wrapper variant="outlined">
        <RegisterForm />
      </Wrapper>
    </Layout>
  );
};
export default RegisterPage;
