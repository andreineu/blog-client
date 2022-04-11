import { GetServerSideProps } from "next";

export function requireAuthentication(
  gssp: GetServerSideProps
): GetServerSideProps {
  return async (context) => {
    const { req, resolvedUrl } = context;

    if (!req.headers.cookie) {
      return {
        redirect: {
          destination: "/login?next=" + resolvedUrl,
          permanent: false
        }
      };
    }

    return await gssp(context);
  };
}
