import {
    createBookingService
}
from "../services/booking.service.js";

import {
    getMyBookingsService
}
from "../services/booking.service.js";

import {

getHostBookingsService

}
from "../services/booking.service.js";
import {

updateBookingStatusService

}
from "../services/booking.service.js";
import {
completeExpiredBookingsService
}
from "../services/booking.service.js";



import {
cancelBookingService
}
from "../services/booking.service.js";

import {
    getBookingHistoryService
}
from "../services/booking.service.js";

export const createBookingController = async(req,res)=>{

    try{


        const data={

            userId:req.user.id,

            ...req.body

        };


        const booking =
        await createBookingService(data);


        res.status(201).json({

            success:true,

            message:"Booking created successfully",

            booking

        });


    }
    catch(error){

        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};

export const getMyBookingsController = async(req,res)=>{

    try{

        const userId = req.user.id;


        const bookings =
        await getMyBookingsService(userId);



        res.status(200).json({

            success:true,

            bookings

        });


    }
    catch(error){

        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
export const getHostBookingsController = async(req,res)=>{


    try{


        const hostId = req.user.id;


        const bookings =
        await getHostBookingsService(hostId);



        res.status(200).json({

            success:true,

            bookings

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

export const updateBookingStatusController = async(req,res)=>{


    try{


        const bookingId = req.params.id;

        const hostId = req.user.id;


        const {
            status
        } = req.body;



        const booking =
        await updateBookingStatusService(
            bookingId,
            hostId,
            status
        );



        if(!booking){

            return res.status(404).json({

                success:false,

                message:"Booking not found"

            });

        }



        res.status(200).json({

            success:true,

            message:"Booking status updated successfully",

            booking

        });



    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};

export const completeExpiredBookingsController = async(req,res)=>{

try{


const result =
await completeExpiredBookingsService();



res.json({

success:true,

message:"Expired bookings completed",

completedBookings:result

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};
// ===============================
// CANCEL BOOKING CONTROLLER
// ===============================

export const cancelBookingController = async(req,res)=>{


    try{


        const bookingId = req.params.id;


        const userId = req.user.id;



        const booking =
        await cancelBookingService(

            bookingId,

            userId

        );



        res.status(200).json({

            success:true,

            message:"Booking cancelled successfully",

            booking

        });


    }
    catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });


    }


};
// ===============================
// BOOKING HISTORY
// ===============================

export const getBookingHistoryController = async(req,res)=>{

    try{

        const userId = req.user.id;

        const history =
        await getBookingHistoryService(userId);

        res.status(200).json({

            success:true,

            history

        });

    }
    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};