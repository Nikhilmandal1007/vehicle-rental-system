import express from "express";

import {
    addVehicle,
    myVehicles,
    updateVehicleController,
    deleteVehicleController
} from "../controllers/vehicle.controller.js";

import {
    authenticate
} from "../middleware/auth.middleware.js";

import {
    authorize
} from "../middleware/role.middleware.js";


const router = express.Router();


router.post(
    "/",
    authenticate,
    authorize("HOST"),
    addVehicle
);


router.get(
    "/my",
    authenticate,
    authorize("HOST"),
    myVehicles
);

router.put(
    "/:id",
    authenticate,
    authorize("HOST"),
    updateVehicleController
);

router.delete(
    "/:id",
    authenticate,
    authorize("HOST"),
    deleteVehicleController
);

export default router;