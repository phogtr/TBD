import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import { useRouter } from "next/router";

import { MarketWrapper } from "../../components/Ticket/MarketWrapper";
import { TrackingWrapper } from "../../components/Ticket/TrackingWrapper";

import { buyTicketRequest, getAvailableTicketsRequest, toPrivateTicketRequest } from "../../api/ticket/ticket.api";
import { withAuthUser } from "../../lib/withAuthUser";
import { AuthUser, Ticket } from "../../interface";

interface MarketProps {
  tickets: Ticket[];
  user: AuthUser;
}

const Market: React.FC<MarketProps> = ({ tickets, user }) => {
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
        <MarketWrapper tickets={tickets} user={user} buyTicketHandler={buyTicketHandler} />
      ) : (
        <TrackingWrapper tickets={tickets} cancelSellingTicketHandler={cancelSellingTicketHandler} />
      )}
    </div>

    // <div>
    //   <h1>Market</h1>
    //   {tickets.map((t) => (
    //     <div key={t.id}>
    //       Destination: {t.destination.destination}
    //       {user.isLoggedIn && t.userId !== user.userId && <button onClick={() => buyTicketHandler(t.id)}>Buy</button>}
    //     </div>
    //   ))}
    // </div>
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
