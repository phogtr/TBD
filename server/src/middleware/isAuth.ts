import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (!authorization) {
    return res.sendStatus(403);
  }

  const token = authorization.split(" ")[1];
  const { payload } = verifyAccessToken(token);

  if (payload) {
    (req as any).user = payload;
  } else if (payload === null) {
    return res.sendStatus(403);
  }

  return next();
};

export default isAuth;
