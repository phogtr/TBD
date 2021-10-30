import { GetServerSideProps } from "next";
import React from "react";
import { getAllTicketsRequest } from "../../api/ticket/ticket.api";

interface IDestination {
  id: string;
  name: string;
}

interface ITicketData {
  id: string;
  destination: IDestination;
}

interface ITicketsProps {
  tickets: ITicketData[];
}

const Tickets: React.FC<ITicketsProps> = ({ tickets }) => {
  return (
    <div>
      <h1>Tickets</h1>
      <div>
        {tickets.map((t) => (
          <div key={t.id}>Destination: {t.destination.name}</div>
        ))}
      </div>
    </div>
  );
};
export default Tickets;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await getAllTicketsRequest();

  return {
    props: {
      tickets: res.data,
    },
  };
};
