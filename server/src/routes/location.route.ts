import { Express } from "express";
import { createLocationHandler } from "../controller/location.controller";

export default function (app: Express) {
  app.post("/api/create-location", createLocationHandler);
}