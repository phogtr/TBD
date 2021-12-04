import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { AuthUser, Ticket } from "../../interface";
import { deleteTicketRequest, getAllTicketsRequest, getUsersTicketsRequest, sellTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";

interface TicketsProps {
  tickets: Ticket[];
}

const Tickets: React.FC<TicketsProps> = ({ tickets }) => {
  const router = useRouter();

  const deleteTicketHandler = async (id: string) => {
    await deleteTicketRequest(id);
    router.push("/tickets");
  };

  const sellTicketHandler = async (id: string) => {
    await sellTicketRequest(id);
    router.push("/tickets");
  };

  return (
    <div>
      <h1>Tickets</h1>
      <div>
        {tickets.map((t) => (
          <div key={t.id}>
            Destination: {t.destination.destination}
            <button onClick={() => deleteTicketHandler(t.id)}>delete</button>
            <button onClick={() => sellTicketHandler(t.id)}>sell</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tickets;

const fetchUsersTickets = () => {
  return async (context: GetServerSidePropsContext, authUser: AuthUser) => {
    const { req } = context;
    const res = await getUsersTicketsRequest(req);
    return {
      props: {
        tickets: res.data.tickets,
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
