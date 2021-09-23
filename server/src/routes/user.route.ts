import { Express } from "express";
import {
  userLoginHandler,
  userLogoutHandler,
  userRegisterHandler,
} from "../controller/user.controller";
import isAuth from "../middleware/isAuth";

export default function (app: Express) {
  app.get("/auth", isAuth, async (req, res) => {
    res.send(`id: ${(req as any).user.userId}`);
  });

  app.post("/api/register", userRegisterHandler);

  app.post("/api/login", userLoginHandler);

  app.post("/api/logout", isAuth, userLogoutHandler);
}
