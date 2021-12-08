import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { AuthUser, Ticket } from "../../interface";
import { buyTicketRequest, getAvailableTicketsRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";

interface MarketProps {
  tickets: Ticket[];
  user: AuthUser;
}

const Market: React.FC<MarketProps> = ({ tickets, user }) => {
  const router = useRouter();

  const buyTicketHandler = async (id: string) => {
    await buyTicketRequest(id);
    router.push("/tickets/market");
  };

  return (
    <div>
      <h1>Market</h1>
      {tickets.map((t) => (
        <div key={t.id}>
          Destination: {t.destination.destination}
          {user.isLoggedIn && <button onClick={() => buyTicketHandler(t.id)}>Buy</button>}
        </div>
      ))}
    </div>
  );
};
export default Market;

const fetchAvailableTickets = () => {
  return async (_context: GetServerSidePropsContext, authUser: AuthUser) => {
    const res = await getAvailableTicketsRequest();
    return {
      props: {
        tickets: res.data,
        user: authUser,
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchAvailableTickets());
