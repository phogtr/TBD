import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { Meta } from "../components/Meta";
import { Navbar } from "../components/Navbar";
import { withAuthUser } from "../lib/withAuthUser";

interface IAuthUser {
  userId: string;
}

interface IHomeProps {
  user: IAuthUser;
  me: string;
}

// me is only available when user is login
const Home: React.FC<IHomeProps> = ({ user, me }) => {
  return (
    <>
      <Meta title="Home" />
      <Navbar authUser={user} />
      <h1>Hello World</h1>
      <div>{me}</div>
    </>
  );
};

export default Home;

const mockFetchData = () => {
  return async (_context: GetServerSidePropsContext, authUser: IAuthUser) => {
    return { props: { user: authUser, me: "hello" } };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser({}, mockFetchData());
