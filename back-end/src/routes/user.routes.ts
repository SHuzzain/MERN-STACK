import { Router } from "express";
import { test } from "../controllers/user.controller";

const userRoute = Router();

userRoute.route("/test").get(test);

export default userRoute;
