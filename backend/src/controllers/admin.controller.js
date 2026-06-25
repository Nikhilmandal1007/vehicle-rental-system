import {
    getPendingHosts,
    approveHost,
    rejectHost
}
from "../services/admin.service.js";


export const pendingHosts = async(req,res)=>{

    try{

        const hosts =
        await getPendingHosts();


        res.status(200).json({

            success:true,

            data:hosts

        });


    }
    catch(error){

        console.log(error);

        res.status(500).json({

            success:false,

            message:"Server error"

        });

    }

};


export const approveHostController = async(req,res)=>{


    try{

        const {id}=req.params;


        const result =
        await approveHost(id);


        res.json({

            success:true,

            message:result.message

        });


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};




export const rejectHostController = async(req,res)=>{


    try{


        const {id}=req.params;


        const result =
        await rejectHost(id);


        res.json({

            success:true,

            message:"Host rejected successfully"

        });


    }catch(error){


        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};