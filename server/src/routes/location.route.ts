import { Express } from "express";
import {
  newLocationHandler,
  getAllLocationsHandler,
  getAvailableLocationsHandler,
} from "../controller/location.controller";

export default function (app: Express) {
  app.post("/api/new-location", newLocationHandler);

  app.get("/api/all-locations", getAllLocationsHandler);

  app.get("/api/available-locations", getAvailableLocationsHandler);
}
