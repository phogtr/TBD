import { Express } from "express";
import {
  createTicketHandler,
  deleteTicketHandler,
  getAllTicketsHandler,
} from "../controller/ticket.controller";

export default function (app: Express) {
  app.post("/api/ticket/create-ticket", createTicketHandler);

  app.get("/api/ticket/all-tickets", getAllTicketsHandler);

  app.delete("/api/ticket/:ticketId/delete", deleteTicketHandler);
}
