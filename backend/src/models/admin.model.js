import pool from "../config/database.js";


export const approveHostModel = async (hostId) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");


        // 1. Get user id from host profile
        const hostResult = await client.query(
            `
            SELECT user_id 
            FROM host_profiles
            WHERE id = $1
            `,
            [hostId]
        );


        if(hostResult.rows.length === 0){
            throw new Error("Host application not found");
        }


        const userId = hostResult.rows[0].user_id;


        // 2. Update host verification status

        await client.query(
            `
            UPDATE host_profiles
            SET verification_status='APPROVED'
            WHERE id=$1
            `,
            [hostId]
        );


        // 3. Change user role USER → HOST

        await client.query(
            `
            UPDATE users
            SET role='HOST'
            WHERE id=$1
            `,
            [userId]
        );


        await client.query("COMMIT");


        return {
            message:"Host approved successfully"
        };


    } catch(error){

        await client.query("ROLLBACK");

        throw error;

    } finally {

        client.release();

    }

};





export const rejectHostModel = async (hostId)=>{


    const result = await pool.query(

        `
        UPDATE host_profiles
        SET verification_status='REJECTED'
        WHERE id=$1
        RETURNING *
        `,

        [hostId]

    );


    return result.rows[0];

};


export const getPendingHostsModel = async()=>{


    const query = `

    SELECT 
        hp.id,
        hp.user_id,
        hp.citizenship_number,
        hp.driving_license_number,
        hp.address,
        hp.verification_status,
        u.name,
        u.email

    FROM host_profiles hp

    JOIN users u

    ON hp.user_id = u.id

    WHERE hp.verification_status='PENDING'

    `;


    const result =
    await pool.query(query);


    return result.rows;

};