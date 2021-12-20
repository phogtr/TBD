import { GetServerSidePropsContext } from "next";

import { getAllTicketsRequest, getUsersTicketsRequest } from "../api/ticket/ticket.api";

import { AuthUser } from "../interface";

export const fetchUsersTickets = () => {
  return async (context: GetServerSidePropsContext, authUser: AuthUser) => {
    if (authUser.isLoggedIn === false) {
      const res = await getAllTicketsRequest();

      return {
        props: {
          tickets: res.data,
          user: authUser,
        },
      };
    }

    const { req } = context;
    const res = await getUsersTicketsRequest(req);
    return {
      props: {
        tickets: res.data.tickets,
        user: authUser,
      },
    };
  };
};
