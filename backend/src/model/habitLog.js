import pool from "../config/db.js";
import { unMark } from "../controllers/logController.js";
export const habitLogModel={

    markComplete:async(user_id,habit_id,log_date,note)=>{
        const result=await pool.query(
            `Insert Into habit_logs(user_id,habit_id,log_date,note)
            Values($1,$2,$3,$4) Returning *`,
            [user_id,habit_id,log_date,note]
        )
        return result.rows[0]
    },

    unMark:async(user_id,habit_id)=>{
        const result=await pool.query(
            `Delete from habit_logs where habit_id=$1 And user_id=$2`,
            [habit_id,user_id]
        )
        return result.rows[0]
    },
    getHabitLogs:async(habit_id)=>{
        const result=await pool.query(
            `Select * from habit_logs where habit_id=$1 order by log_date desc`,
            [habit_id]
        )
        return result.rows
    },
    getHabitLogDates:async(habit_id)=>{
        const result=await pool.query(
            `Select log_date from habit_logs where habit_id=$1 order by log_date ASC`,
            [habit_id]
        )
        return result.rows
    },
    getToday:async(log_date,user_id)=>{
        const result= await pool.query(
            `Select * from habit_logs where log_date=$1 AND user_id=$2`,
            [log_date,user_id]
        )
        return result.rows
    }

}