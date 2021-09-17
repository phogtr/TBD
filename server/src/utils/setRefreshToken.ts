import { Response } from "express";

export const setRefreshToken = (res: Response, token: string) => {
  res.cookie("refreshToken", token, { httpOnly: true });
};
