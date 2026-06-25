import { getAllUsers } from "../services/user.service.js";


export const getUsers = async(req,res)=>{

    try{

        const users = await getAllUsers();

        res.json({
            success:true,
            data:users
        });


    }catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};