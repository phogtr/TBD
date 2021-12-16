import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

import { TicketWrapper } from "../../components/Ticket/TicketWrapper";
import { TrackingWrapper } from "../../components/Ticket/TrackingWrapper";

import { deleteTicketRequest, sellTicketRequest, toPrivateTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { fetchUsersTickets } from "../../lib/fetchUsersTickets";

import { AuthUser, TabOptions, Ticket } from "../../interface";

interface TrackingProps {
  tickets: Ticket[];
  user?: AuthUser;
}

const Tracking: React.FC<TrackingProps> = ({ tickets }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = React.useState<TabOptions>("tracking");

  const deleteTicketHandler = async (id: string) => {
    await deleteTicketRequest(id);
    router.replace("/tickets");
  };

  const sellTicketHandler = async (id: string) => {
    await sellTicketRequest(id);
    router.replace("/tickets");
  };

  const cancelSellingTicketHandler = async (id: string) => {
    await toPrivateTicketRequest(id);
    router.replace("/tickets/tracking", "/tickets");
  };

  const navigateToTickets = () => {
    setCurrentTab("tickets");
    router.replace("/tickets/tracking", "/tickets");
  };

  const navigateToTracking = () => {
    setCurrentTab("tracking");
    router.replace("/tickets/tracking");
  };

  return (
    <div>
      <h2>page</h2>
      <div>
        <button onClick={navigateToTickets}>Tickets</button>
        <button onClick={navigateToTracking}>Tracking</button>
      </div>
      {currentTab === "tickets" ? (
        <TicketWrapper tickets={tickets} deleteTicketHandler={deleteTicketHandler} sellTicketHandler={sellTicketHandler} />
      ) : (
        <TrackingWrapper tickets={tickets} cancelSellingTicketHandler={cancelSellingTicketHandler} />
      )}
    </div>
  );
};
export default Tracking;

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchUsersTickets());
