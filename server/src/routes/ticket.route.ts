import { Express } from "express";
import { createTicketHandler } from "../controller/ticket.controller";

export default function (app: Express) {
  app.post("/api/create-ticket", createTicketHandler);
}