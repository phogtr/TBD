import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

import { toPrivateTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { fetchUsersTickets } from "../../lib/fetchUsersTickets";

import { AuthUser, Ticket } from "../../interface";

interface TrackingProps {
  tickets: Ticket[];
  user?: AuthUser;
}

const Tracking: React.FC<TrackingProps> = ({ tickets }) => {
  const router = useRouter();

  const cancelSellingTicketHandler = async (id: string) => {
    await toPrivateTicketRequest(id);
    router.replace("/tickets/tracking", "/tickets");
  };

  const navigateToTickets = () => {
    router.replace("/tickets");
  };

  const navigateToTracking = () => {
    router.replace("/tickets/tracking");
  };

  return (
    <div>
      <div>
        <button onClick={navigateToTickets}>Tickets</button>
        <button onClick={navigateToTracking}>Tracking</button>
      </div>
      <div>
        <h1>Tracking</h1>
        {tickets.map((t) => (
          <div key={t.id}>
            {t.status === "AVAILABLE" && (
              <>
                Destination: {t.destination.destination}
                <button onClick={() => cancelSellingTicketHandler(t.id)}>Cancel</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tracking;

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
