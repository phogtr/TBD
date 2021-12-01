import { GetServerSideProps } from "next";
import React from "react";

import { Ticket } from "../../interface";
import { getAvailableTicketsRequest } from "../../api/ticket/ticket.api";

interface MarketProps {
  tickets: Ticket[];
}

const Market: React.FC<MarketProps> = ({ tickets }) => {
  return (
    <div>
      <h1>Market</h1>
      {tickets.map((t) => (
        <div key={t.id}>Destination: {t.destination.destination}</div>
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
