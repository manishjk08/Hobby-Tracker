import pool from "../config/db";

export const habitLogModel={

    findHabitById:async(id)=>{
        const result=await pool.query(
            `Select * from habits`
        )
    }
}