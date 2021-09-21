import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import axios from "./axios";

const refreshingToken = async () => {
  await axios.post("/refresh-token", undefined);
};

const requestAuthUser = async (url: string) => {
  try {
    const res = await axios.get(url);
    const authUser = {
      userId: res.data,
    };
    return authUser;
  } catch (error) {
    throw error;
  }
};

const fetcher = async (url: string) => {
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
    throw error;
  }
};

export const useUser = ({ redirecTo = "", redirecIfFound = false }) => {
  const { data, mutate } = useSWR("/auth", fetcher);
  const router = useRouter();

  useEffect(() => {
    if (!redirecTo || !data) return;

    if ((redirecTo && !redirecIfFound && !data) || (redirecIfFound && data)) {
      router.push(redirecTo);
    }
  }, [data, redirecTo, redirecIfFound]);

  return {
    userData: data,
    mutateUser: mutate,
  };
};
