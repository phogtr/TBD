import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

import { Ticket } from "../../interface";
import { buyTicketRequest, getAvailableTicketsRequest } from "../../api/ticket/ticket.api";

interface MarketProps {
  tickets: Ticket[];
}

const Market: React.FC<MarketProps> = ({ tickets }) => {
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
          <button onClick={() => buyTicketHandler(t.id)}>Buy</button>
        </div>
      ))}
    </div>
  );
};
export default Market;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAvailableTicketsRequest();

  return {
    props: {
      tickets: res.data,
    },
  };
};
