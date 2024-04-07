import { Router } from "express";
import { signup } from "../controllers/auth.controller";

const authRoute = Router();

authRoute.route("/signup").post(signup);

export default authRoute;
