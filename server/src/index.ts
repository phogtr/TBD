import express from "express";
import pool from "./db/pool";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/users", async (_req, res) => {
  try {
    const allUsers = await pool.query("SELECT * from users;");
    res.json(allUsers.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { user_name, user_email, user_password } = req.body;

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *;",
      [user_name, user_email, user_password]
    );
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
