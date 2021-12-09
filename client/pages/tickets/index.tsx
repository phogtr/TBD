import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { TicketWrapper } from "../../components/Ticket/TicketWrapper";

import { deleteTicketRequest, getAllTicketsRequest, getUsersTicketsRequest, sellTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { AuthUser, Ticket } from "../../interface";
import { Tracking } from "../../components/Ticket/Tracking";

interface TicketsProps {
  tickets: Ticket[];
  user?: AuthUser;
}

const Tickets: React.FC<TicketsProps> = ({ tickets, user }) => {
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
      {!user ? (
        <>
          <TicketWrapper tickets={tickets} sellTicketHandler={sellTicketHandler} deleteTicketHandler={deleteTicketHandler} />
          <Tracking tickets={tickets} />
        </>
      ) : (
        <>
          <h2>No data, please login</h2>
          {tickets.map((t) => (
            <div key={t.id}>
              Destination: {t.destination.destination}
              <div>Status: {t.status}</div>
              <button onClick={() => deleteTicketHandler(t.id)}>delete</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
export default Tickets;

const fetchUsersTickets = () => {
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
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
