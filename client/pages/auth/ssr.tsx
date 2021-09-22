import { GetServerSideProps } from "next";
import React from "react";
import { requirePageAuth } from "../../lib/requirePageAuth";

interface ISSRProps {
  user: {
    userId: string;
  };
}

const SSR: React.FC<ISSRProps> = ({ user }) => {
  return (
    <div>
      <h1>SSR</h1>
      {user ? <h3>{user.userId}</h3> : <h3>No data</h3>}
    </div>
  );
};
export default SSR;

export const getServerSideProps: GetServerSideProps = requirePageAuth();
