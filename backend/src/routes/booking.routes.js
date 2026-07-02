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

import {
completeExpiredBookingsController
}
from "../controllers/booking.controller.js";

import {
    cancelBookingController,
    getBookingHistoryController
}
from "../controllers/booking.controller.js";
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
router.put(
"/complete-expired",
completeExpiredBookingsController
);
router.put(
    "/:id/cancel",
    authenticate,
    cancelBookingController
);

router.get(
    "/history",
    authenticate,
    getBookingHistoryController
);

export default router;