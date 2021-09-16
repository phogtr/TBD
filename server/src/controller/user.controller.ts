import bcrypt from "bcrypt";
import { Request, Response } from "express";
import pool from "../db/pool";

export async function registerUserHandler(req: Request, res: Response) {
  try {
    const { username, user_email, user_password } = req.body;

    const saltNum = +process.env.SALT_NUM!;
    const salt = await bcrypt.genSalt(saltNum);
    const hashPassword = bcrypt.hashSync(user_password, salt);

    const newUser = await pool.query(
      "INSERT INTO users (username, user_email, user_password) VALUES($1, $2, $3) RETURNING user_id, username, user_email",
      [username, user_email, hashPassword]
    );

    return res.json(newUser.rows[0]);
  } catch (error) {
    return res.status(400).send({
      errorMessage: "Email has already been used. Please enter a different one",
    });
  }
}
