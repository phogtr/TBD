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

const SSR: React.FC<ISSRProps> = ({ user }) => {
  return (
    <>
      <Navbar authUser={user} />
      <div>
        <h1>SSR</h1>
        {user ? <h3>{user.userId}</h3> : <h3>No data</h3>}
      </div>
    </>
  );
};
export default SSR;

export const getServerSideProps: GetServerSideProps = withAuthUser({ redirectTo: "/login" });
