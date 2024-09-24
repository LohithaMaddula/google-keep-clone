import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./configs/db.js";
import notesRoute from "./routes/notesRoute.js";

const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Keep clone backend");
});

app.use("/api", notesRoute);

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
