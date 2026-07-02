import cron from "node-cron";

import {
    completeExpiredBookingsService
}
from "../services/booking.service.js";


console.log("Booking cron started");


// Testing: runs every minute

cron.schedule(
    "* * * * *",
    async()=>{

        try{


            const result =
            await completeExpiredBookingsService();



            console.log(
                "Expired bookings processed:",
                result.length
            );


        }
        catch(error){


            console.log(
                "Booking cron error:",
                error.message
            );


        }

    }

);