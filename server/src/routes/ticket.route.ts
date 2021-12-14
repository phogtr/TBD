import { Express } from "express";
import {
  buyTicketHandler,
  createTicketHandler,
  deleteTicketHandler,
  getAllTicketsHandler,
  getAvailableTicketsHandler,
  getUsersTicketsHandler,
  sellTicketHandler,
  updateTicketToPrivate,
} from "../controller/ticket.controller";

import isAuth from "../middleware/isAuth";

export default function (app: Express) {
  app.post("/api/ticket/create-ticket", createTicketHandler);

  app.get("/api/ticket/all-tickets", getAllTicketsHandler);

  app.get("/api/ticket/available-tickets", getAvailableTicketsHandler);

  app.get("/api/ticket/users-tickets", isAuth, getUsersTicketsHandler);

  app.patch("/api/ticket/:ticketId/sell", isAuth, sellTicketHandler);

  app.patch("/api/ticket/:ticketId/buy", isAuth, buyTicketHandler);

  app.patch("/api/ticket/:ticketId/toPrivate", isAuth, updateTicketToPrivate);

  app.delete("/api/ticket/:ticketId/delete", deleteTicketHandler);
}
