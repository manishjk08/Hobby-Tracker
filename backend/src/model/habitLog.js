import pool from "../config/db.js";
import { unMark } from "../controllers/logController.js";

export const habitLogModel={

    markComplete:async(user_id,habit_id,log_date,note)=>{
        const result=await pool.query(
            `Insert Into habit_logs(user_id,habit_id,log_date,completed,note)
            Values($1,$2,$3,true,$5) Returning *`,
            [user_id,habit_id,log_date,note]
        )
        return result.rows[0]
    },

    unMark:async(user_id,habit_id)=>{
        const result=await pool.query(
            `Delete from habit_logs where habit_id=$1 And user_id=$2`,
            [habit_id,user_id]
        )
    }

}