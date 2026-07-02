import {
    createVehicleModel,
    getMyVehiclesModel,
    updateVehicleModel,
    deleteVehicleModel
}
from "../models/vehicle.model.js";

import {
    getAllVehicles,
    getVehicleByIdModel
} from "../models/vehicle.model.js";

import {
    getNearbyVehiclesModel
}
from "../models/vehicle.model.js";
import {
getVehicleAvailabilityModel
}
from "../models/vehicle.model.js";
import {
    completeExpiredBookingsModel,
    getCompletedVehicleIdsModel
}
from "../models/booking.model.js";
import {
    updateVehicleAvailabilityModel
}
from "../models/vehicle.model.js";



export const createVehicle = async(data)=>{


    return await createVehicleModel(data);


};
export const getMyVehicles = async(hostId)=>{

    return await getMyVehiclesModel(hostId);

};
export const updateVehicle = async(
    vehicleId,
    hostId,
    data
)=>{


    return await updateVehicleModel(
        vehicleId,
        hostId,
        data
    );

};
export const deleteVehicle = async(
    vehicleId,
    hostId
)=>{


    return await deleteVehicleModel(
        vehicleId,
        hostId
    );

};
export const getVehiclesService = async()=>{

    const vehicles = await getAllVehicles();

    return vehicles;

};
export const getVehicleByIdService = async(id)=>{

    return await getVehicleByIdModel(id);

};

export const getNearbyVehiclesService = async(
    latitude,
    longitude,
    radius
)=>{

    return await getNearbyVehiclesModel(
        latitude,
        longitude,
        radius
    );

};
export const checkVehicleAvailabilityService = async(vehicleId)=>{


    const booking =
    await getVehicleAvailabilityModel(vehicleId);



    if(!booking){

        return {

            available:true,

            availableFrom:null

        };

    }



    const availableDate =
    new Date(booking.end_date);



    availableDate.setDate(
        availableDate.getDate()+1
    );



    return {

        available:false,

        availableFrom:
        availableDate.toISOString().split("T")[0]

    };


};
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