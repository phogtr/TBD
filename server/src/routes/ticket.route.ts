import { Express } from "express";
import { createTicketHandler, getAllTicketsHandler } from "../controller/ticket.controller";

export default function (app: Express) {
  app.post("/api/create-ticket", createTicketHandler);

  app.get("/api/all-tickets", getAllTicketsHandler);
}
