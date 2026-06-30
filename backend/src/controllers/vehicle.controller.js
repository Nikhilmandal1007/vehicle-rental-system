import {
    createVehicle,
    getMyVehicles,
    updateVehicle,
    deleteVehicle,
    getVehiclesService,
    getNearbyVehiclesService
} from "../services/vehicle.service.js";

import {
    getVehicleByIdService
}
from "../services/vehicle.service.js";


// Add Vehicle
export const addVehicle = async(req,res)=>{

    try{

        const data = {

            hostId:req.user.id,

            ...req.body

        };


        const vehicle = await createVehicle(data);


        res.status(201).json({

            success:true,

            message:"Vehicle added successfully",

            vehicle

        });


    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



// Get Host Vehicles
export const myVehicles = async(req,res)=>{

    try{

        const hostId = req.user.id;


        const vehicles = await getMyVehicles(hostId);


        res.status(200).json({

            success:true,

            vehicles

        });


    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// Update Vehicle
export const updateVehicleController = async(req,res)=>{

    try{

        const vehicleId = req.params.id;

        const hostId = req.user.id;


        const updatedVehicle =
        await updateVehicle(
            vehicleId,
            hostId,
            req.body
        );


        if(!updatedVehicle){

            return res.status(404).json({

                success:false,

                message:"Vehicle not found or not owned by you"

            });

        }


        res.status(200).json({

            success:true,

            message:"Vehicle updated successfully",

            vehicle:updatedVehicle

        });


    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// Delete Vehicle
export const deleteVehicleController = async(req,res)=>{

    try{

        const vehicleId = req.params.id;

        const hostId = req.user.id;


        const deletedVehicle =
        await deleteVehicle(
            vehicleId,
            hostId
        );


        if(!deletedVehicle){

            return res.status(404).json({

                success:false,

                message:"Vehicle not found or not owned by you"

            });

        }


        res.json({

            success:true,

            message:"Vehicle deleted successfully"

        });


    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// Get All Vehicles
export const getVehicles = async(req,res)=>{

    try{

        const vehicles =
        await getVehiclesService();


        res.json({

            success:true,

            vehicles

        });


    }catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




// Nearby Vehicles using PostGIS
export const getNearbyVehiclesController = async(req,res)=>{

    try{


        const {
            latitude,
            longitude,
            radius
        } = req.query;



        const vehicles =
        await getNearbyVehiclesService(
            latitude,
            longitude,
            radius
        );



        res.status(200).json({

            success:true,

            vehicles

        });



    }catch(error){


        console.log(error);


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};
export const getVehicleByIdController = async(req,res)=>{

    try{

        const vehicleId=req.params.id;


        const vehicle =
        await getVehicleByIdService(vehicleId);


        if(!vehicle){

            return res.status(404).json({

                success:false,
                message:"Vehicle not found"

            });

        }


        res.json({

            success:true,
            vehicle

        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};