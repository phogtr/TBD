import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import { server } from "../config";

const fetcher = async (url: string) => {
  try {
    const res = await axios.get(url, { withCredentials: true });
    const authUser = {
      userId: res.data,
    };
    return authUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const useUser = ({ redirecTo = "", redirecIfFound = false }) => {
  const { data, mutate } = useSWR(`${server}/auth`, fetcher);
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
