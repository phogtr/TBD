import { GetServerSidePropsContext } from "next";
import axios from "./axios";

export const requirePageAuth = () => {
  return async (context: GetServerSidePropsContext) => {
    const { req } = context;
    try {
      const { data } = await axios.get("/auth", {
        headers: {
          cookie: req.headers.cookie,
        },
      });
      // console.log(data);
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
};
