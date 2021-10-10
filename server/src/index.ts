import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { locationRoute, ticketRoute, tokenRoute, userRoute } from "./routes";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

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
  tokenRoute(app);
  locationRoute(app);
  ticketRoute(app);
});
