import { compare, genSalt, hashSync } from "bcrypt";
import { Request, Response } from "express";
import prisma from "../db/prisma";
import {
  accessTokenCookieOptions,
  defaultCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/cookieOptions";
import { createAccessToken, createRefreshToken } from "../utils/jwt.utils";
import { setCookies } from "../utils/setCookies";

export const userRegisterHandler = async (req: Request, res: Response) => {
  const { username, email, password }: { username: string; email: string; password: string } =
    req.body;

  try {
    const saltNum = +process.env.SALT_NUM!;
    const salt = await genSalt(saltNum);
    const hashPassword = hashSync(password, salt);

    // const newUser = await pool.query(
    //   "INSERT INTO users (username, user_email, user_password) VALUES($1, $2, $3) RETURNING user_id, username, user_email",
    //   [username, email, hashPassword]
    // );

    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashPassword,
      },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    // return res.json(newUser.rows[0]);
    return res.json(newUser);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "Email has already been used. Please enter a different one",
    });
  }
};

export const userLoginHandler = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);
  const existedUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  // if (user.rows.length === 0)
  if (!existedUser) {
    return res.status(401).send({
      errorMessage: "Email is invalid",
    });
  }

  const validPassword = await compare(password, existedUser.password);

  if (!validPassword) {
    return res.status(401).send({
      errorMessage: "Password is invalid",
    });
  }

  const refreshToken = createRefreshToken({ userId: existedUser.id });
  setCookies(res, "refreshToken", refreshToken, refreshTokenCookieOptions);

  const accessToken = createAccessToken({
    userId: existedUser.id,
    username: existedUser.username,
  });
  setCookies(res, "accessToken", accessToken, accessTokenCookieOptions);

  return res.status(200).send({
    userId: existedUser.id,
    username: existedUser.username,
  });
};

export const userLogoutHandler = async (_req: Request, res: Response) => {
  setCookies(res, "refreshToken", "", { ...defaultCookieOptions, maxAge: 0 });
  setCookies(res, "accessToken", "", { ...defaultCookieOptions, maxAge: 0 });
  return res.sendStatus(200);
};
