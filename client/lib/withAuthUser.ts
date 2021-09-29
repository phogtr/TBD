import { IncomingMessage, ServerResponse } from "http";
import { GetServerSidePropsContext } from "next";
import axios from "./axios";

const refreshingToken = async (req: IncomingMessage, res: ServerResponse) => {
  const response = await axios.post("/refresh-token", undefined, {
    headers: { cookie: req.headers.cookie },
  });
  const cookies = response.headers["set-cookie"];
  req.headers.cookie = cookies;
  res.setHeader("set-cookie", cookies);
};

const requestAuthUser = async (req: IncomingMessage) => {
  try {
    const { data } = await axios.get("/auth", {
      headers: { cookie: req.headers.cookie },
    });
    const authUser = {
      userId: data.userId,
      username: data.username,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

const getAuthUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const authUser = await requestAuthUser(req);
    return authUser;
  } catch (error) {
    if ((error as any)?.response?.status === 401) {
      // accessToken is expired, refreshToken still available
      try {
        await refreshingToken(req, res);
        const authUser = await requestAuthUser(req);
        return authUser;
      } catch (err2) {
        // unexpected error here
        console.log(err2);
      }
    }
    // else ... console.log(error) here
    // both cookies are not in the header => undefined error from axios
    return null;
  }
};

export const withAuthUser = ({ redirectTo = "" }, inner?: Function) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const authUser = await getAuthUser(req, res);

    if (!authUser) {
      if (redirectTo !== "") {
        res.writeHead(307, { location: redirectTo });
        res.end();
      }
      return { props: {} };
    }

    return inner ? inner(context, authUser) : { props: { user: authUser } };
  };
};
