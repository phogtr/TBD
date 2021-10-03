import { NextFunction, Request, Response } from "express";
import { getDataFromAccessToken } from "../utils/getDataFromAccToken";

const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  const payload = getDataFromAccessToken(req);

  if (payload) {
    res.locals.user = payload;
  } else if (payload === null) {
    return res.sendStatus(401);
  }

  return next();
};

export default isAuth;
