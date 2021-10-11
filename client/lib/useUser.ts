import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "./axios";

const refreshingToken = async () => {
  await axios.post("/refresh-token", undefined);
};

const requestAuthUser = async (
  url: string
): Promise<{
  userId: string;
  username: string;
  isLoggedIn: boolean;
}> => {
  try {
    const res = await axios.get(url);
    const authUser = {
      userId: res.data.userId,
      username: res.data.username,
      isLoggedIn: true,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

const fetcher = async (
  url: string
): Promise<{
  userId: string;
  username: string;
  isLoggedIn: boolean;
}> => {
  try {
    return await requestAuthUser(url);
  } catch (error) {
    if ((error as any)?.response?.status === 401) {
      try {
        await refreshingToken();
        return await requestAuthUser(url);
      } catch (err2) {
        return {
          userId: "",
          username: "",
          isLoggedIn: false,
        };
      }
    }
    // else ... console.log(error) here => unexpected error
    return {
      userId: "",
      username: "",
      isLoggedIn: false,
    };
  }
};

export const useUser = ({ redirectTo = "" }) => {
  const { data, mutate } = useSWR("/auth", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (redirectTo === "" || !data) return;

    if (redirectTo && data.isLoggedIn === false) {
      router.push(redirectTo);
    }
  }, [data, redirectTo]);

  return {
    userData: data,
    mutateUser: mutate,
  };
};
