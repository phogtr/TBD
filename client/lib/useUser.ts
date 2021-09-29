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
}> => {
  try {
    const res = await axios.get(url);
    const authUser = {
      userId: res.data.userId,
      username: res.data.username,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

const fetcher = async (
  url: string
): Promise<
  | {
      userId: string;
      username: string;
    }
  | undefined
> => {
  try {
    return await requestAuthUser(url);
  } catch (error) {
    if ((error as any)?.response?.status === 401) {
      try {
        await refreshingToken();
        return await requestAuthUser(url);
      } catch (err2) {
        throw err2;
      }
    }
    // else ... console.log(error) here => unexpected error
    return;
  }
};

export const useUser = ({ redirectTo = "" }) => {
  const { data, mutate } = useSWR("/auth", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (redirectTo === "" && !data) return;

    if (redirectTo && !data) {
      router.push(redirectTo);
    }
  }, [data, redirectTo]);

  return {
    userData: data,
    mutateUser: mutate,
  };
};
