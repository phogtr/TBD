import { Express } from "express";
import { userRegisterHandler } from "../controller/user.controller";

export default function (app: Express) {
  app.post("/api/registerUser", userRegisterHandler);
}
