import express from "express";

import {pendingHosts} from "../controllers/admin.controller.js";


import {authenticate} from "../middleware/auth.middleware.js";


import {authorize} from "../middleware/role.middleware.js";

import {
    approveHostController,
    rejectHostController
}
from "../controllers/admin.controller.js";

const router = express.Router();

router.put(
    "/host/:id/approve",
    authenticate,
    authorize("ADMIN"),
    approveHostController
);



router.put(
    "/host/:id/reject",
    authenticate,
    authorize("ADMIN"),
    rejectHostController
);


router.get(
    "/hosts",
    authenticate,
    authorize("ADMIN"),
    pendingHosts
);


export default router;