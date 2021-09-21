import { Express } from "express";
import { refreshTokenHandler } from "../controller/token.controller";

export default function (app: Express) {
  app.post("/refresh-token", refreshTokenHandler);
}
