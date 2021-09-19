import { Response } from "express";

export const setCookies = (res: Response, name: string, token: string) => {
  res.cookie(name, token, { httpOnly: true });
};
