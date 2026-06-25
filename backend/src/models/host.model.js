import pool from "../config/database.js";

export const findHostByUserIdModel = async (
    userId
) => {

    const query =
        "SELECT * FROM host_profiles WHERE user_id = $1";

    const result =
        await pool.query(query, [userId]);

    return result.rows[0];
};

export const createHostProfileModel = async (
    userId,
    citizenshipNumber,
    licenseNumber,
    address
) => {

    const query = `
        INSERT INTO host_profiles
        (
            user_id,
            citizenship_number,
            driving_license_number,
            address
        )
        VALUES
        ($1,$2,$3,$4)
        RETURNING *
    `;

    const result = await pool.query(
        query,
        [
            userId,
            citizenshipNumber,
            licenseNumber,
            address
        ]
    );

    return result.rows[0];
};