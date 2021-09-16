import { compare, genSalt, hashSync } from "bcrypt";
import { Request, Response } from "express";
import pool from "../db/pool";
import { createAccessToken, createRefreshToken } from "../utils/jwt.utils";

export const userRegisterHandler = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const saltNum = +process.env.SALT_NUM!;
    const salt = await genSalt(saltNum);
    const hashPassword = hashSync(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, user_email, user_password) VALUES($1, $2, $3) RETURNING user_id, username, user_email",
      [username, email, hashPassword]
    );

    return res.send(res.json(newUser.rows[0]));
  } catch (error) {
    return res.status(400).send({
      errorMessage: "Email has already been used. Please enter a different one",
    });
  }
};

export const userLoginHandler = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

  if (user.rows.length === 0) {
    return res.status(401).send({
      errorMessage: "Email is invalid",
    });
  }

  const validPassword = await compare(password, user.rows[0].user_password);

  if (!validPassword) {
    return res.status(401).send({
      errorMessage: "Password is invalid",
    });
  }

  const refreshToken = createRefreshToken({ userId: user.rows[0].user_id });
  res.cookie("refreshToken", refreshToken, { httpOnly: true });

  const accessToken = createAccessToken({ userId: user.rows[0].user_id });
  return res.send({ accessToken });
};
