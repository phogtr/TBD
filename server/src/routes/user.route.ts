import { Express } from "express";
import { userLoginHandler, userRegisterHandler } from "../controller/user.controller";
import isAuth from "../middleware/isAuth";

export default function (app: Express) {
  app.get("/auth", isAuth, async (req, res) => {
    // @ts-ignore
    res.send(`id: ${req.user.userId}`);
  });

  app.post("/api/register", userRegisterHandler);

  app.post("/api/login", userLoginHandler);
}
