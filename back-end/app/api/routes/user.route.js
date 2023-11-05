import express from 'express'
import { testController } from '../controllers/user.controllers.js';

const router = express.Router();

router.get('/test', testController)


export default router;