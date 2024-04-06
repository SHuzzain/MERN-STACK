import express, { Router } from "express";
import { testController } from "../controllers/user.controllers.js";

const router = Router();

router.get("/test", testController);

export default router;
