import pool from "../config/database.js";


export const getAllUsers = async()=>{

    const result = await pool.query(
        "SELECT * FROM users"
    );

    return result.rows;

};