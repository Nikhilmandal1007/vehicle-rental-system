import express from "express";


import {
    createBookingController,
    getMyBookingsController,
    getHostBookingsController,
    updateBookingStatusController
}
from "../controllers/booking.controller.js";


import {
    authenticate
}
from "../middleware/auth.middleware.js";


import {
    authorize
}
from "../middleware/role.middleware.js";


const router = express.Router();



router.post(
    "/",
    authenticate,
    createBookingController
);



router.get(
    "/my",
    authenticate,
    getMyBookingsController
);



router.get(
    "/host",
    authenticate,
    authorize("HOST"),
    getHostBookingsController
);

router.put(

"/:id/status",

authenticate,

authorize("HOST"),

updateBookingStatusController

);

export default router;