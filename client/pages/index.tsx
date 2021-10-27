import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { getAllLocationsRequest } from "../api/location/location.api";
import { getAllTicketsRequest } from "../api/ticket/ticket.api";
import { Meta } from "../components/Meta";
import { Navbar } from "../components/Navbar";
import { withAuthUser } from "../lib/withAuthUser";

import Cookie from "js-cookie";
import cookie from "cookie";

interface IAuthUser {
  userId: string;
  username: string;
  isLoggedIn: boolean;
}

interface IHomeProps {
  user: IAuthUser;
  me: string;
  check: string;
}

const Home: React.FC<IHomeProps> = ({ user, me, check }) => {
  const [isCheck, setIsCheck] = React.useState(() => JSON.parse(check));

  React.useEffect(() => {
    getAllTicketsRequest().then((res) => console.log(res.data));
    getAllLocationsRequest().then((res) => console.log(res.data));

    Cookie.set("isCheck", JSON.stringify(isCheck));
  }, [isCheck]);

  return (
    <>
      <Meta title="Home" />
      <Navbar authUser={user} />
      <h1>Hello World</h1>
      <div>{me}</div>
      <div>
        Check me
        <input type="checkbox" checked={isCheck} onChange={(e) => setIsCheck(e.target.checked)} />
      </div>
    </>
  );
};

export default Home;

const mockFetchData = () => {
  return async (context: GetServerSidePropsContext, authUser: IAuthUser) => {
    const { req } = context;
    const cookies = cookie.parse(req ? req.headers.cookie || "" : document.cookie);

    return { props: { user: authUser, me: "hello", check: cookies.isCheck } };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser({}, mockFetchData());
