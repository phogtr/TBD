import { Express } from "express";
import { registerUserHandler } from "../controller/user.controller";

export default function (app: Express) {
  app.post("/api/registerUser", registerUserHandler);
}
