import { Request } from "express";
import { verifyAccessToken } from "./jwt.utils";

export const getDataFromAccessToken = (req: Request) => {
  const token = req.cookies["accessToken"];
  const { payload } = verifyAccessToken(token);
  return payload;
}