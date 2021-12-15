import React from "react";

import { Ticket } from "../../interface";

interface TrackingProps {
  tickets: Ticket[];
  cancelSellingTicketHandler: (id: string) => void;
}

export const Tracking: React.FC<TrackingProps> = ({ tickets, cancelSellingTicketHandler }) => {
  return (
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
  );
};
