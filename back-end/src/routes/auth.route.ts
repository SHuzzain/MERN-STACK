import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.route("/signup").post(signup);
authRoute.route("/signin").put(signin);

export default authRoute;
