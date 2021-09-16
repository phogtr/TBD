import dotenv from "dotenv";
import express from "express";
import userRoute from "./routes/user.route";

const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

// app.get("/users", async (_req, res) => {
//   try {
//     const allUsers = await pool.query("SELECT * from users;");
//     res.json(allUsers.rows);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);

  userRoute(app);
});
