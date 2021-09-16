import { genSalt, hashSync } from "bcrypt";
import { Request, Response } from "express";
import pool from "../db/pool";

export async function userRegisterHandler(req: Request, res: Response) {
  const { username, email, password } = req.body;
  try {
    const saltNum = +process.env.SALT_NUM!;
    const salt = await genSalt(saltNum);
    const hashPassword = hashSync(password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, user_email, user_password) VALUES($1, $2, $3) RETURNING user_id, username, user_email",
      [username, email, hashPassword]
    );

    return res.json(newUser.rows[0]);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "Email has already been used. Please enter a different one",
    });
  }
}
