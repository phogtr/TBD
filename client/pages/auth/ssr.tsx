import axios from "axios";
import { GetServerSideProps } from "next";
import React from "react";
import { server } from "../../config";
import { useAuth } from "../../context/user.context";

interface ISSRProps {}

const SSR: React.FC<ISSRProps> = ({}) => {
  const { user } = useAuth();
  return (
    <div>
      <h1>SSR</h1>
      {user ? <h3>{user.userId}</h3> : <h3>No data</h3>}
    </div>
  );
};
export default SSR;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  try {
    const { data } = await axios.get(`${server}/auth`, {
      headers: {
        cookie: req.headers.cookie,
      },
    });
    console.log(data);
    const authUser = {
      userId: data,
    };
    return {
      props: {
        user: authUser,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {},
    };
  }
};
