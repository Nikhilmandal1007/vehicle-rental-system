import express from "express";


import {
    addVehicle,
    myVehicles,
    updateVehicleController,
    deleteVehicleController,
    getVehicles,
    getNearbyVehiclesController
} from "../controllers/vehicle.controller.js";

import {
getVehicleByIdController
}
from "../controllers/vehicle.controller.js";


import {
    authenticate
} from "../middleware/auth.middleware.js";


import {
    authorize
} from "../middleware/role.middleware.js";
import {
    checkVehicleAvailabilityController
} from "../controllers/vehicle.controller.js";




const router = express.Router();



router.get("/test", (req, res)=>{

    res.send("Vehicle routes file working");

});



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



router.get(
    "/",
    getVehicles
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



// PostGIS Nearby Vehicle Search
router.get(
    "/nearby",
    getNearbyVehiclesController
);

router.get(
"/:id",
getVehicleByIdController
);
router.get(
"/:id/availability",
checkVehicleAvailabilityController
);



export default router;