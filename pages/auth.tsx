import { GetServerSideProps } from "next";
import AuthForm from "../components/auth/authForm";
import { getSession } from "next-auth/client";

function AuthPage() {
  return <AuthForm />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session) return { redirect: { destination: "/", permanent: false } };

  return { props: { session } };
};

export default AuthPage;
