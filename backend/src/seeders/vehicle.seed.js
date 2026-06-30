import pool from "../config/database.js";


const seedVehicles = async()=>{

    try{

        await pool.query(
            `
            INSERT INTO vehicles
            (
                host_id,
                vehicle_type,
                brand,
                model,
                registration_number,
                price_per_km,
                location,
                is_available
            )
            VALUES

            (
                1,
                'CAR',
                'Toyota',
                'Corolla',
                'BA-12-1111',
                50,
                'Kathmandu',
                true
            ),

            (
                1,
                'CAR',
                'Honda',
                'Civic',
                'BA-12-2222',
                70,
                'Pokhara',
                true
            ),

            (
                1,
                'BIKE',
                'Yamaha',
                'FZ',
                'BA-12-3333',
                25,
                'Bhaktapur',
                true
            )

            ON CONFLICT (registration_number)
            DO NOTHING;
            `
        );


        console.log("Vehicles seeded successfully");


    }catch(error){

        console.log(error);

    }

};


export default seedVehicles;