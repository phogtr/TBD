import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["accessToken"];
  const { payload } = verifyAccessToken(token);

  if (payload) {
    (req as any).user = payload;
  } else if (payload === null) {
    return res.sendStatus(403);
  }

  return next();
};

export default isAuth;
