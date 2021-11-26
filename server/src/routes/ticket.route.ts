import { Express } from "express";
import {
  buyTicketHandler,
  createTicketHandler,
  deleteTicketHandler,
  getAllTicketsHandler,
  getAvailableTicketsHandler,
  sellTicketHandler,
} from "../controller/ticket.controller";

export default function (app: Express) {
  app.post("/api/ticket/create-ticket", createTicketHandler);

  app.get("/api/ticket/all-tickets", getAllTicketsHandler);

  app.get("/api/ticket/available-tickets", getAvailableTicketsHandler);

  app.delete("/api/ticket/:ticketId/delete", deleteTicketHandler);

  app.patch("/api/ticket/:ticketId/sell", sellTicketHandler);

  app.patch("/api/ticket/:ticketId/buy", buyTicketHandler);
}
