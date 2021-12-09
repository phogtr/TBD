import React from "react";

import { Ticket } from "../../interface";

interface TrackingProps {
  tickets: Ticket[];
}

export const Tracking: React.FC<TrackingProps> = ({ tickets }) => {
  return (
    <div>
      <h1>Tracking</h1>
      {tickets.map((t) => (
        <div key={t.id}>
          {t.status === "AVAILABLE" && (
            <>
              Destination: {t.destination.destination}
              <button onClick={() => {}}>Cancel</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};
