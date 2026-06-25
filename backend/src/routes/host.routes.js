import express from "express";

import {applyHost} from "../controllers/host.controller.js";

import {authenticate} from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/apply",authenticate,applyHost);



export default router;