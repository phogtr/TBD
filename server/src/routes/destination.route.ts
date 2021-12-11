import { Express } from "express";
import {
  newDestinationHandler,
  getAllDestinationsHandler,
  getUnassignedDestinationsHandler,
  removeDestinationHandler,
} from "../controller/destionation.controller";

export default function (app: Express) {
  app.post("/api/destinations/new-destination", newDestinationHandler);

  app.get("/api/destinations/all-destinations", getAllDestinationsHandler);

  app.get("/api/destinations/unassigned-destinations", getUnassignedDestinationsHandler);

  app.delete("/api/destinations/:destinationId/delete", removeDestinationHandler);
}
