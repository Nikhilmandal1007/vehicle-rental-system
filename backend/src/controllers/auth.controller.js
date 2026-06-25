import {findUserByEmail,createUser} from "../services/auth.service.js";

import { hashPassword } from "../utils/password.js";
import { getUserByEmail} from "../services/auth.service.js";
import {comparePassword} from "../utils/password.js";
import {generateToken} from "../utils/token.js";

export const register = async (req,res) => {

    try {

        const {
            name,
            email,
            password,
            phone
        } = req.body;


        // Validation

        if (!name ||!email ||!password ) {

            return res.status(400).json({
                success: false,
                message:
                "All required fields are mandatory"
            });

        }


        // Check existing email

        const existingUser = await findUserByEmail(email);

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message:
                "Email already exists"
            });

        }


        // Hash password

        const hashedPassword = await hashPassword(password);


        // Create user

        const user = await createUser(name,email,hashedPassword,phone);

        res.status(201).json({
            success: true,
            message:
            "User registered successfully",
            user
        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
            "Internal Server Error"
        });

    }

};

export const login = async(req,res)=>{

    try{

        const {email, password} = req.body;

        if(!email || !password){

            return res.status(400).json({
                success:false,
                message:"Email and password required"
            });

        }

        const user = await getUserByEmail(email);

        if(!user){

            return res.status(404).json({
                success:false,
                message:"User not found"
            });

        }

        const isPasswordValid = await comparePassword(password,user.password);

        if(!isPasswordValid){

            return res.status(401).json({
                success:false,
                message:"Invalid password"
            });

        }

        const token = generateToken(user);

        res.json({

            success:true,

            message:"Login successful",

            token,

            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }

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