import { IncomingMessage, ServerResponse } from "http";
import { GetServerSidePropsContext } from "next";
import axios from "./axios";

const refreshingToken = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.post("/refresh-token", undefined, {
    headers: {
      cookie: req.headers.cookie,
    },
  });
  const cookies = response.headers["set-cookie"];
  req.headers.cookie = cookies;
  res.setHeader("set-cookie", cookies);
};

const requestAuthUser = async (req: IncomingMessage) => {
  try {
    const { data } = await axios.get("/auth", {
      headers: {
        cookie: req.headers.cookie,
      },
    });
    const authUser = {
      userId: data,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

export const requirePageAuth = () => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    try {
      const authUser = await requestAuthUser(req);
      return {
        props: {
          user: authUser,
        },
      };
    } catch (error) {
      if ((error as any)?.response?.status === 401) {
        // accessToken is expired, refreshToken still available
        try {
          await refreshingToken(req, res);
          const authUser = await requestAuthUser(req);
          return {
            props: {
              user: authUser,
            },
          };
        } catch (err2) {
          // both cookies are not in the header => undefined error from axios
          console.log(err2);
        }
      }
      return {
        props: {},
      };
    }
  };
};
