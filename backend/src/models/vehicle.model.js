import pool from "../config/database.js";


// ===============================
// CREATE VEHICLE
// ===============================

export const createVehicleModel = async(data)=>{

    const {
        hostId,
        vehicleType,
        brand,
        model,
        registrationNumber,
        pricePerKm,
        location,
        latitude,
        longitude
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
    location,
    coordinates
)

VALUES
(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,

    ST_SetSRID(
        ST_MakePoint($8,$9),
        4326
    )::geography
)

RETURNING *

`,

[
    hostId,
    vehicleType,
    brand,
    model,
    registrationNumber,
    pricePerKm,
    location,
    longitude,
    latitude
]

);


return result.rows[0];

};




// ===============================
// GET ALL AVAILABLE VEHICLES
// ===============================

export const getAllVehicles = async()=>{


    const result = await pool.query(

`
SELECT *

FROM vehicles

WHERE is_available=true

ORDER BY created_at DESC

`

);


return result.rows;

};




// ===============================
// GET HOST VEHICLES
// ===============================

export const getMyVehiclesModel = async(hostId)=>{


    const result = await pool.query(

`
SELECT *

FROM vehicles

WHERE host_id=$1

ORDER BY created_at DESC

`,

[
    hostId
]

);


return result.rows;

};




// ===============================
// UPDATE VEHICLE
// ===============================

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




// ===============================
// DELETE VEHICLE
// ===============================

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




// ===============================
// POSTGIS NEARBY VEHICLES
// ===============================

export const getNearbyVehiclesModel = async(
    latitude,
    longitude,
    radius
)=>{


    const result = await pool.query(

`
SELECT

id,

host_id,

vehicle_type,

brand,

model,

registration_number,

price_per_km,

location,

is_available,


ROUND(

(
ST_Distance(

coordinates,

ST_SetSRID(

ST_MakePoint($1,$2),

4326

)::geography

)

/

1000

)::numeric,

2

)

AS distance_km



FROM vehicles



WHERE is_available=true



AND ST_DWithin(

coordinates,

ST_SetSRID(

ST_MakePoint($1,$2),

4326

)::geography,

$3

)



ORDER BY distance_km ASC;

`,

[
    longitude,
    latitude,
    radius
]

);


return result.rows;

};




// ===============================
// GET VEHICLE DETAILS
// ===============================

export const getVehicleByIdModel = async(vehicleId)=>{


    const result = await pool.query(

`
SELECT

vehicles.*,

users.name AS host_name,

users.phone AS host_phone


FROM vehicles


JOIN users

ON vehicles.host_id = users.id


WHERE vehicles.id=$1

`,

[
    vehicleId
]

);


return result.rows[0];

};




// ===============================
// TRANSACTION SUPPORT
// UPDATE VEHICLE AVAILABILITY
// ===============================

export const updateVehicleAvailabilityModel = async(
    client,
    vehicleId,
    isAvailable
)=>{


    const result = await client.query(

`
UPDATE vehicles

SET

is_available=$1


WHERE id=$2


RETURNING *

`,

[
    isAvailable,
    vehicleId
]

);


return result.rows[0];

};