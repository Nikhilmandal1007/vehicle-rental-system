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