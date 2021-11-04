import { Express } from "express";
import {
  createTicketHandler,
  deleteTicketHandler,
  getAllTicketsHandler,
} from "../controller/ticket.controller";

export default function (app: Express) {
  app.post("/api/create-ticket", createTicketHandler);

  app.get("/api/all-tickets", getAllTicketsHandler);

  app.delete("/api/ticket/:ticketId", deleteTicketHandler);
}
