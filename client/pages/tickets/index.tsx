import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

import { deleteTicketRequest, sellTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { fetchUsersTickets } from "../../lib/fetchUsersTickets";

import { AuthUser, Ticket } from "../../interface";

interface TicketsProps {
  tickets: Ticket[];
  user?: AuthUser;
}

const Tickets: React.FC<TicketsProps> = ({ tickets, user }) => {
  const router = useRouter();

  const deleteTicketHandler = async (id: string) => {
    await deleteTicketRequest(id);
    router.replace("/tickets");
  };

  const sellTicketHandler = async (id: string) => {
    await sellTicketRequest(id);
    router.replace("/tickets");
  };

  const navigateToTickets = () => {
    router.replace("/tickets");
  };

  const navigateToTracking = () => {
    router.replace("/tickets/tracking");
  };

  return (
    <div>
      {!user ? (
        <>
          <div>
            <button onClick={navigateToTickets}>Tickets</button>
            <button onClick={navigateToTracking}>Tracking</button>
          </div>
          <div>
            <h1>Tickets</h1>
            {tickets.map((t) => (
              <div key={t.id}>
                Destination: {t.destination.destination}
                {/* <button onClick={() => deleteTicketHandler(t.id)}>delete</button> */}
                {t.status === "PRIVATE" && <button onClick={() => sellTicketHandler(t.id)}>sell</button>}
              </div>
            ))}
          </div>
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

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
