import pool from "../config/database.js";


export const createVehicleModel = async(data)=>{


    const {
        hostId,
        vehicleType,
        brand,
        model,
        registrationNumber,
        pricePerKm,
        location
    } = data;



    const result = await pool.query(

    `
    INSERT INTO vehicles
    (
        host_id,
        vehicle_type,
        brand,
        model,
        registration_number,
        price_per_km,
        location
    )

    VALUES
    ($1,$2,$3,$4,$5,$6,$7)

    RETURNING *

    `,

    [
        hostId,
        vehicleType,
        brand,
        model,
        registrationNumber,
        pricePerKm,
        location
    ]

    );


    return result.rows[0];

};

export const getMyVehiclesModel = async(hostId)=>{

    const result = await pool.query(

        `
        SELECT *
        FROM vehicles
        WHERE host_id=$1
        ORDER BY created_at DESC
        `,

        [hostId]

    );


    return result.rows;

};
export const updateVehicleModel = async(
    vehicleId,
    hostId,
    data
)=>{


    const {
        pricePerKm,
        location,
        isAvailable
    } = data;


    const result = await pool.query(

        `
        UPDATE vehicles

        SET
        price_per_km=$1,
        location=$2,
        is_available=$3

        WHERE id=$4
        AND host_id=$5

        RETURNING *

        `,

        [
            pricePerKm,
            location,
            isAvailable,
            vehicleId,
            hostId
        ]

    );


    return result.rows[0];

};
export const deleteVehicleModel = async(
    vehicleId,
    hostId
)=>{


    const result = await pool.query(

        `
        DELETE FROM vehicles

        WHERE id=$1
        AND host_id=$2

        RETURNING *

        `,

        [
            vehicleId,
            hostId
        ]

    );


    return result.rows[0];

};