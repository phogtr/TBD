import React from "react";
import { Ticket } from "../../interface";

interface TicketWrapperProps {
  tickets: Ticket[];
  sellTicketHandler: (id: string) => void;
  deleteTicketHandler: (id: string) => void;
}

export const TicketWrapper: React.FC<TicketWrapperProps> = ({ tickets, sellTicketHandler, deleteTicketHandler }) => {
  return (
    <div>
      <h1>Tickets</h1>
      {tickets.map((t) => (
        <div key={t.id}>
          Destination: {t.destination.destination}
          <button onClick={() => deleteTicketHandler(t.id)}>delete</button>
          {t.status === "PRIVATE" && <button onClick={() => sellTicketHandler(t.id)}>sell</button>}
        </div>
      ))}
    </div>
  );
};
