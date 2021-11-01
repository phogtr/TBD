import { Express } from "express";
import {
  createLocationHandler,
  getAllLocationsHandler,
  getAvailableLocationsHandler,
} from "../controller/location.controller";

export default function (app: Express) {
  app.post("/api/create-location", createLocationHandler);

  app.get("/api/all-locations", getAllLocationsHandler);

  app.get("/api/available-locations", getAvailableLocationsHandler);
}
