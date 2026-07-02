import cron from "node-cron";

import {
    completeExpiredBookingsService
}
from "../services/booking.service.js";



cron.schedule(
    "0 0 * * *",
    async()=>{


        console.log("Booking cron started");


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