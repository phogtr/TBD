import React from "react";
import { AuthUser, Ticket } from "../../interface";

interface MarketWrapperProps {
  tickets: Ticket[];
  user: AuthUser;
  buyTicketHandler: (id: string) => Promise<void>;
}

export const MarketWrapper: React.FC<MarketWrapperProps> = ({ tickets, user, buyTicketHandler }) => {
  return (
    <div>
      <h1>Market</h1>
      {tickets.map((t) => (
        <div key={t.id}>
          Destination: {t.destination.destination}
          {user.isLoggedIn && t.userId !== user.userId && <button onClick={() => buyTicketHandler(t.id)}>Buy</button>}
        </div>
      ))}
    </div>
  );
};
