import React from "react";

import { Ticket } from "../../interface";

interface TrackingWrapperProps {
  tickets: Ticket[];
  cancelSellingTicketHandler: (id: string) => Promise<void>;
}

export const TrackingWrapper: React.FC<TrackingWrapperProps> = ({ tickets, cancelSellingTicketHandler }) => {
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
