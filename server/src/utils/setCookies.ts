import { CookieOptions, Response } from "express";

export const setCookies = (res: Response, name: string, token: string, options: CookieOptions) => {
  res.cookie(name, token, options);
};
