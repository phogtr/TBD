import { GetServerSideProps } from "next";
import React from "react";
import { getAllTicketsRequest } from "../../api/ticket/ticket.api";

interface IDestination {
  id: string;
  name: string;
}

interface ITicketsData {
  id: string;
  destination: IDestination;
}

interface ITicketsProps {
  tickets: ITicketsData[];
}

const Tickets: React.FC<ITicketsProps> = ({ tickets }) => {
  return (
    <div>
      <h1>Tickets</h1>
      <div>
        {tickets.map((t) => (
          <div key={t.id}>Location: {t.destination.name}</div>
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
