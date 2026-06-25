import pool from "../config/database.js";

export const findUserByEmailModel = async (email) => {

    const query =
        "SELECT * FROM users WHERE email = $1";

    const result =
        await pool.query(query, [email]);

    return result.rows[0];
};

export const createUserModel = async (
    name,
    email,
    password,
    phone
) => {

    const query = `
        INSERT INTO users
        (name, email, password, phone)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `;

    const result = await pool.query(
        query,
        [name, email, password, phone]
    );

    return result.rows[0];
};