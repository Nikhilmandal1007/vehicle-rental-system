import pool from "../config/database.js";


import {
    createBookingModel,
    getMyBookingsModel,
    getHostBookingsModel,
    updateBookingStatusModel,
    getBookingByIdModel,
    checkBookingAvailabilityModel,
    checkActiveVehicleBookingsModel,
     completeExpiredBookingsModel,
    getCompletedVehicleIdsModel,
    cancelBookingModel,
    getBookingHistoryModel
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
// COMPLETE EXPIRED BOOKINGS

export const completeExpiredBookingsService = async()=>{


    const client = await pool.connect();


    try{


        await client.query("BEGIN");


        const completedBookings =
        await completeExpiredBookingsModel(client);



        const vehicles =
        await getCompletedVehicleIdsModel(client);



        for(const vehicle of vehicles){


            await updateVehicleAvailabilityModel(

                client,

                vehicle.vehicle_id,

                true

            );

        }



        await client.query("COMMIT");


        return completedBookings;


    }
    catch(error){


        await client.query("ROLLBACK");

        throw error;


    }
    finally{


        client.release();

    }


};
// ===============================
// CANCEL BOOKING SERVICE
// ===============================

export const cancelBookingService = async(
    bookingId,
    userId
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



        // Check ownership

        if(booking.user_id !== userId){


            throw new Error(
                "You cannot cancel this booking"
            );

        }



        // Check status

        if(
            booking.status === "COMPLETED" ||
            booking.status === "CANCELLED"
        ){

            throw new Error(
                "Booking cannot be cancelled"
            );

        }




        // Update booking status

        const cancelledBooking =
        await cancelBookingModel(

            client,

            bookingId,

            userId

        );





        // Check remaining active bookings

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




        await client.query("COMMIT");


        return cancelledBooking;



    }
    catch(error){


        await client.query("ROLLBACK");


        throw error;


    }
    finally{


        client.release();


    }


};// ===============================
// BOOKING HISTORY
// ===============================

export const getBookingHistoryService = async(userId)=>{

    const bookings =
    await getBookingHistoryModel(userId);


    const history = {

        upcoming: [],
        completed: [],
        cancelled: [],
        rejected: []

    };


    for(const booking of bookings){

        switch(booking.status){

            case "PENDING":
            case "APPROVED":

                history.upcoming.push(booking);

                break;


            case "COMPLETED":

                history.completed.push(booking);

                break;


            case "CANCELLED":

                history.cancelled.push(booking);

                break;


            case "REJECTED":

                history.rejected.push(booking);

                break;

        }

    }


    return history;

};