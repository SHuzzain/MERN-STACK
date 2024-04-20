import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.route.js";
import { nextErrors } from "./middleware/errorHandle.js";
import cros from "cors";
import bodyParser from "body-parser";
import path from "path";

const app = express();

dotenv.config();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use(cros());

mongoose
  .connect(process.env.MONGO_CONNECTION as string)
  .then(() => {
    console.log("Connection successfully established");
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port  ${PORT}`);
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/rootPage/index.html"));
});

app.use("/api/user", userRoute);

app.use("/api/auth", authRoute);

app.use(nextErrors);
