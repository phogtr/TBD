import { GetServerSideProps } from "next";
import React from "react";
import { useRouter } from "next/router";

import { ITicket } from "../../interface";
import { deleteTicketRequest, getAllTicketsRequest } from "../../api/ticket/ticket.api";

interface ITicketsProps {
  tickets: ITicket[];
}

const Tickets: React.FC<ITicketsProps> = ({ tickets }) => {
  const router = useRouter();

  const deleteTicketHandler = async (id: string) => {
    await deleteTicketRequest(id);
    router.push("/tickets");
  };

  return (
    <div>
      <h1>Tickets</h1>
      <div>
        {tickets.map((t) => (
          <div key={t.id}>
            Destination: {t.destination.name}
            <button onClick={() => deleteTicketHandler(t.id)}>delete</button>
          </div>
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
