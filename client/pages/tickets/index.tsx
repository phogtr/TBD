import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { AuthUser, Ticket } from "../../interface";
import { deleteTicketRequest, getAllTicketsRequest, getUsersTicketsRequest, sellTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";

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
      <h1>Tickets</h1>
      {!user ? (
        <div>
          {tickets.map((t) => (
            <div key={t.id}>
              Destination: {t.destination.destination}
              <button onClick={() => deleteTicketHandler(t.id)}>delete</button>
              <button onClick={() => sellTicketHandler(t.id)}>sell</button>
            </div>
          ))}
        </div>
      ) : (
        <>
          <h2>No data, please login</h2>
          {tickets.map((t) => (
            <div key={t.id}>
              Destination: {t.destination.destination}
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
    ``;
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
