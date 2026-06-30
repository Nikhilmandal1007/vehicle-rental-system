import pool from "../config/database.js";


// CREATE BOOKING

export const createBookingModel = async(data)=>{

    const {
        userId,
        vehicleId,
        hostId,
        startDate,
        endDate,
        pickupLocation
    } = data;


    const result = await pool.query(

`
INSERT INTO bookings
(
    user_id,
    vehicle_id,
    host_id,
    start_date,
    end_date,
    pickup_location
)

VALUES
(
    $1,
    $2,
    $3,
    $4,
    $5,
    $6
)

RETURNING *

`,

[
    userId,
    vehicleId,
    hostId,
    startDate,
    endDate,
    pickupLocation
]

);


return result.rows[0];

};



// USER MY BOOKINGS

export const getMyBookingsModel = async(userId)=>{

    const result = await pool.query(

`
SELECT

bookings.*,

vehicles.brand,
vehicles.model,
vehicles.vehicle_type,
vehicles.location,
vehicles.price_per_km

FROM bookings

JOIN vehicles

ON bookings.vehicle_id = vehicles.id


WHERE bookings.user_id=$1


ORDER BY bookings.created_at DESC

`,

[
    userId
]

);


return result.rows;

};



// HOST BOOKING REQUESTS

export const getHostBookingsModel = async(hostId)=>{

    const result = await pool.query(

`
SELECT

bookings.id AS booking_id,

bookings.start_date,
bookings.end_date,
bookings.pickup_location,
bookings.status,
bookings.created_at,


users.name AS customer_name,
users.phone AS customer_phone,


vehicles.id AS vehicle_id,
vehicles.brand,
vehicles.model,
vehicles.vehicle_type,
vehicles.location,
vehicles.price_per_km


FROM bookings


JOIN users

ON bookings.user_id = users.id


JOIN vehicles

ON bookings.vehicle_id = vehicles.id



WHERE bookings.host_id=$1


ORDER BY bookings.created_at DESC

`,

[
    hostId
]

);


return result.rows;

};




// UPDATE BOOKING STATUS (TRANSACTION SUPPORT)

export const updateBookingStatusModel = async(
    client,
    bookingId,
    hostId,
    status
)=>{


    const result = await client.query(

`
UPDATE bookings

SET status=$1

WHERE id=$2
AND host_id=$3

RETURNING *

`,

[
    status,
    bookingId,
    hostId
]

);


return result.rows[0];

};




// GET BOOKING DETAILS

export const getBookingByIdModel = async(
    client,
    bookingId
)=>{


    const result = await client.query(

`
SELECT *

FROM bookings

WHERE id=$1

`,

[
    bookingId
]

);


return result.rows[0];

};

export const checkBookingAvailabilityModel = async(
    vehicleId,
    startDate,
    endDate
)=>{


    const result = await pool.query(

`
SELECT *

FROM bookings

WHERE vehicle_id=$1

AND status IN ('PENDING','APPROVED')

AND (

    start_date <= $3

    AND

    end_date >= $2

)

`,

[
    vehicleId,
    startDate,
    endDate
]

);


return result.rows.length === 0;

};
export const checkActiveVehicleBookingsModel = async(
    client,
    vehicleId
)=>{


    const result = await client.query(

`
SELECT id

FROM bookings

WHERE vehicle_id=$1

AND status='APPROVED'

LIMIT 1

`,
[
    vehicleId
]

);


return result.rows.length > 0;


};