import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { MarketWrapper } from "../../components/Ticket/MarketWrapper";
import { TrackingWrapper } from "../../components/Ticket/TrackingWrapper";

import { buyTicketRequest, getAvailableTicketsRequest, getUsersTicketsRequest, toPrivateTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { AuthUser, Ticket } from "../../interface";

interface MarketProps {
  marketTickets: Ticket[];
  userTickets: Ticket[];
  user: AuthUser;
}

const Market: React.FC<MarketProps> = ({ marketTickets, userTickets, user }) => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = React.useState("market");

  const buyTicketHandler = async (id: string) => {
    await buyTicketRequest(id);
    router.push("/tickets/market");
  };

  const cancelSellingTicketHandler = async (id: string) => {
    await toPrivateTicketRequest(id);
    router.replace("/tickets/market", "/tickets/tracking");
  };

  const navigateToMarket = () => {
    setCurrentTab("market");
    router.replace("/tickets/market");
  };

  const navigateToTracking = () => {
    setCurrentTab("tracking");
    router.replace("/tickets/market", "/tickets/tracking");
  };

  return (
    <div>
      <button onClick={navigateToMarket}>Market</button>
      <button onClick={navigateToTracking}>Tracking</button>
      {currentTab === "market" ? (
        <MarketWrapper tickets={marketTickets} user={user} buyTicketHandler={buyTicketHandler} />
      ) : (
        <TrackingWrapper tickets={userTickets} cancelSellingTicketHandler={cancelSellingTicketHandler} />
      )}
    </div>
  );
};
export default Market;

const fetchTickets = () => {
  return async (context: GetServerSidePropsContext, authUser: AuthUser) => {
    const { req } = context;
    const ticket = await getAvailableTicketsRequest();
    const user = await getUsersTicketsRequest(req);
    return {
      props: {
        marketTickets: ticket.data,
        userTickets: user.data.tickets,
        user: authUser,
      },
    };
  };
};

export const getServerSideProps: GetServerSideProps = withAuthUser(fetchTickets());
