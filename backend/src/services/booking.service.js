import pool from "../config/database.js";


import {
    createBookingModel,
    getMyBookingsModel,
    getHostBookingsModel,
    updateBookingStatusModel,
    getBookingByIdModel,
    checkBookingAvailabilityModel,
    checkActiveVehicleBookingsModel
}
from "../models/booking.model.js";


import {
    updateVehicleAvailabilityModel
}
from "../models/vehicle.model.js";




// Create Booking

export const createBookingService = async(data)=>{


    const {
        vehicleId,
        startDate,
        endDate
    } = data;



    const available =
    await checkBookingAvailabilityModel(
        vehicleId,
        startDate,
        endDate
    );



    if(!available){

        throw new Error(
            "Vehicle is already booked for selected dates"
        );

    }



    return await createBookingModel(data);

};






// User Bookings

export const getMyBookingsService = async(userId)=>{

    return await getMyBookingsModel(userId);

};






// Host Bookings

export const getHostBookingsService = async(hostId)=>{

    return await getHostBookingsModel(hostId);

};







// Update Booking Status With Transaction

export const updateBookingStatusService = async(
    bookingId,
    hostId,
    status
)=>{


    const client = await pool.connect();


    try{


        await client.query("BEGIN");



        // Get booking details

        const booking =
        await getBookingByIdModel(
            client,
            bookingId
        );



        if(!booking){

            throw new Error(
                "Booking not found"
            );

        }




        // Check host ownership

        if(
            booking.host_id !== hostId
        ){

            throw new Error(
                "You cannot update this booking"
            );

        }





        // Check before approving

        if(status === "APPROVED"){


            const available =
            await checkBookingAvailabilityModel(

                booking.vehicle_id,

                booking.start_date,

                booking.end_date,

                bookingId

            );



            if(!available){

                throw new Error(
                    "Vehicle already has another booking for selected dates"
                );

            }


        }





        // Update booking status

        const updatedBooking =
        await updateBookingStatusModel(

            client,

            bookingId,

            hostId,

            status

        );







        // Vehicle availability update


        if(status === "APPROVED"){


            await updateVehicleAvailabilityModel(

                client,

                booking.vehicle_id,

                false

            );


        }





        if(status === "REJECTED"){


            const activeBooking =
            await checkActiveVehicleBookingsModel(

                client,

                booking.vehicle_id

            );



            if(!activeBooking){


                await updateVehicleAvailabilityModel(

                    client,

                    booking.vehicle_id,

                    true

                );


            }


        }






        await client.query("COMMIT");


        return updatedBooking;



    }
    catch(error){


        await client.query("ROLLBACK");


        throw error;


    }
    finally{


        client.release();


    }


};