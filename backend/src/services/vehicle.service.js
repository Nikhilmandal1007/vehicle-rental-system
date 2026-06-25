import {
    createVehicleModel,
    getMyVehiclesModel,
    updateVehicleModel,
    deleteVehicleModel
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