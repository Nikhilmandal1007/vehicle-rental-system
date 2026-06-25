import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";


const router = express.Router();

router.get("/",authenticate,(req,res)=>{

    res.json({

        success:true,

        message:"Profile accessed",

        user:req.user

    });

});


export default router;