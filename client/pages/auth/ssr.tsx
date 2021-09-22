import { GetServerSideProps } from "next";
import React from "react";
import { Navbar } from "../../components/Navbar";
import { withAuthUser } from "../../lib/withAuthUser";

interface IAuthUser {
  userId: string;
}

interface ISSRProps {
  user: IAuthUser;
  me: string;
}

// me only available if user is login
const SSR: React.FC<ISSRProps> = ({ user, me }) => {
  return (
    <>
      <Navbar />
      <div>
        <h1>SSR</h1>
        {user ? <h3>{user.userId}</h3> : <h3>No data</h3>}
        <div>{me}</div>
      </div>
    </>
  );
};
export default SSR;

export const getServerSideProps: GetServerSideProps = withAuthUser(async (authUser: IAuthUser) => {
  // inner function to fetch data & only fetch if withAuthUser return the user
  // console.log(authUser);
  return { props: { user: authUser, me: "hello" } };
});
