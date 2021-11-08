import { Request, Response } from "express";
import { accessTokenCookieOptions, refreshTokenCookieOptions } from "../utils/cookieOptions";
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "../utils/jwt.utils";
import { setCookies } from "../utils/setCookies";
import prisma from "../db/prisma";

export const refreshTokenHandler = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.sendStatus(401);
  }

  const { payload } = verifyRefreshToken(token);
  if (payload === null) {
    return res.sendStatus(400);
  }

  // const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
  //   (payload as any).userId,
  // ]);
  const user = await prisma.user.findUnique({
    where: {
      id: (payload as any).userId,
    },
  });

  // unexpected error
  if (!user) {
    return res.sendStatus(500);
  }

  const refreshToken = createRefreshToken({ userId: user.id });
  setCookies(res, "refreshToken", refreshToken, refreshTokenCookieOptions);

  const accessToken = createAccessToken({
    userId: user.id,
    username: user.username,
  });
  setCookies(res, "accessToken", accessToken, accessTokenCookieOptions);

  return res.sendStatus(200);
};
