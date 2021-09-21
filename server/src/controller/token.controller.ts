import { Request, Response } from "express";
import pool from "../db/pool";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../utils/cookieOptions";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt.utils";
import { setCookies } from "../utils/setCookies";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.sendStatus(401);
  }

  const { payload } = verifyRefreshToken(token);
  if (payload === null) {
    return res.sendStatus(400);
  }

  const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    (payload as any).userId,
  ]);

  if (user.rows.length === 0) {
    return res.sendStatus(500);
  }

  const refreshToken = createRefreshToken({ userId: user.rows[0].user_id });
  setCookies(res, "refreshToken", refreshToken, refreshTokenCookieOptions);

  const accessToken = createAccessToken({ userId: user.rows[0].user_id });
  setCookies(res, "accessToken", accessToken, accessTokenCookieOptions);

  return res.sendStatus(200);
};
