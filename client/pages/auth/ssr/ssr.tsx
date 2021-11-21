import React from "react";
import { GetServerSideProps } from "next";

import { Navbar } from "../../../components/Navbar";

import { AuthUser } from "../../../interface";
import { withAuthUser } from "../../../lib/withAuthUser";

interface SSRProps {
  user: AuthUser;
}

const SSR: React.FC<SSRProps> = ({ user }) => {
  return (
    <>
      <Navbar authUser={user} />
      <div>
        <h1>SSR</h1>
        {user.isLoggedIn ? (
          <div>
            <h3>{user.userId}</h3>
            <h3>{user.username}</h3>
          </div>
        ) : (
          <h3>No data</h3>
        )}
      </div>
    </>
  );
};
export default SSR;

export const getServerSideProps: GetServerSideProps = withAuthUser();
