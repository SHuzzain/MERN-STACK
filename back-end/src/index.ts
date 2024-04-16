import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/user.routes.js";
import authRoute from "./routes/auth.route.js";
import { MongoClient, ServerApiVersion } from "mongodb";
import { nextErrors } from "./middleware/errorHandle.js";

const app = express();

dotenv.config();

app.use(express.json());

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

app.use("/api/user", userRoute);

app.use("/api/auth", authRoute);

app.use(nextErrors);
