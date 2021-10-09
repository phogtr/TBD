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
  const theUser = await prisma.buyer.findUnique({
    where: {
      id: (payload as any).userId,
    },
  });

  // unexpected error
  if (!theUser) {
    return res.sendStatus(500);
  }

  const refreshToken = createRefreshToken({ userId: theUser.id });
  setCookies(res, "refreshToken", refreshToken, refreshTokenCookieOptions);

  const accessToken = createAccessToken({
    userId: theUser.id,
    username: theUser.username,
  });
  setCookies(res, "accessToken", accessToken, accessTokenCookieOptions);

  return res.sendStatus(200);
};
