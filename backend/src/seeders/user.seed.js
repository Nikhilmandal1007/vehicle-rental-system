import pool from "../config/database.js";
import bcrypt from "bcrypt";


const seedUsers = async()=>{

    try{

        const hashedPassword = await bcrypt.hash(
            "password123",
            10
        );


        await pool.query(
            `
            INSERT INTO users
            (
                name,
                email,
                password,
                phone,
                role
            )
            VALUES
            ($1,$2,$3,$4,$5),
            ($6,$7,$8,$9,$10),
            ($11,$12,$13,$14,$15)

            ON CONFLICT(email) DO NOTHING
            `,
            [

                // Admin
                "Admin User",
                "admin@gmail.com",
                hashedPassword,
                "9800000001",
                "ADMIN",


                // Normal User
                "Test User",
                "user@gmail.com",
                hashedPassword,
                "9800000002",
                "USER",


                // Host
                "Host User",
                "host@gmail.com",
                hashedPassword,
                "9800000003",
                "HOST"

            ]
        );


        console.log("Users seeded successfully");


    }catch(error){

        console.log(error);

    }

};


export default seedUsers;