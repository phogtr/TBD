import { Express } from "express";
import {
  newDestinationHandler,
  getAllDestinationsHandler,
  getAvailableDestinationsHandler,
} from "../controller/destionation.controller";

export default function (app: Express) {
  app.post("/api/new-destination", newDestinationHandler);

  app.get("/api/all-destinations", getAllDestinationsHandler);

  app.get("/api/available-destinations", getAvailableDestinationsHandler);
}
