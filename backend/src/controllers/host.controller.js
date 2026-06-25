import {createHostProfile,findHostByUserId} from "../services/host.service.js";

export const applyHost = async(req,res)=>{

    try{

        const userId = req.user.id;

        const {
            citizenship_number,
            driving_license_number,
            address
        } = req.body;



        const existingHost = await findHostByUserId(userId);

        if(existingHost){

            return res.status(400).json({

                success:false,

                message:
                "Host application already submitted"

            });

        }



        const host = await createHostProfile(

            userId,

            citizenship_number,

            driving_license_number,

            address

        );

        res.status(201).json({

            success:true,

            message:
            "Host application submitted successfully",

            data:host

        });

    }
    catch(error){
     console.log(error);

        res.status(500).json({

            success:false,

            message:
            "Server error"

        });


    }


};