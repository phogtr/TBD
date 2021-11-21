import { IncomingMessage, ServerResponse } from "http";
import { GetServerSidePropsContext } from "next";
import { refreshTokenRequest } from "../api/user/user.api";
import axios from "./axios";

const refreshingToken = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const response = await refreshTokenRequest(req.headers.cookie);
    const cookies = response.headers["set-cookie"];
    req.headers.cookie = cookies;
    res.setHeader("set-cookie", cookies);
  } catch (error) {
    throw error;
  }
};

const requestAuthUser = async (
  req: IncomingMessage
): Promise<{
  userId: string;
  username: string;
  isLoggedIn: boolean;
}> => {
  try {
    const { data } = await axios.get("/auth", {
      headers: { cookie: req.headers.cookie },
    });
    const authUser = {
      userId: data.userId,
      username: data.username,
      isLoggedIn: true,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

const getAuthUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<{
  userId: string;
  username: string;
  isLoggedIn: boolean;
}> => {
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
        console.log("Expect error from refreshingToken: ", err2);
        return {
          userId: "",
          username: "",
          isLoggedIn: false,
        };
      }
    }
    // else ... console.log(error) here
    // both cookies are not in the header => undefined error from axios
    return {
      userId: "",
      username: "",
      isLoggedIn: false,
    };
  }
};

export const withAuthUser = (inner?: Function) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const authUser = await getAuthUser(req, res);

    return inner ? inner(context, authUser) : { props: { user: authUser } };
  };
};
