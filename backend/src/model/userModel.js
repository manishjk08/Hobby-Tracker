import pool from "../config/db.js";

export const userModel={

    findUserByEmail:async(email)=>{
        const result=await pool.query(
            `Select * from users where email=$1`,
            [email]
        )
        return result.rows[0]
    },

    findUserById:async(id)=>{
        const result=await pool.query(
            `Select * from users where id=$1`,
            [id]
        )
        return result.rows[0]
    },

    createUser:async(name,email,hashpassword)=>{
        const result=await pool.query(
            `Insert into users(name,email,hashpassword) VALUES ($1,$2,$3) Returning name,email`,
            [name,email,hashpassword]
        )
        return result.rows[0]
    }
    



}