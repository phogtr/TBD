import { Express } from "express";
import { userLoginHandler, userRegisterHandler } from "../controller/user.controller";

export default function (app: Express) {
  app.post("/api/register", userRegisterHandler);

  app.post("/api/login", userLoginHandler);
}
