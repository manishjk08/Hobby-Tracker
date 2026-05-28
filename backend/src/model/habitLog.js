import pool from "../config/db.js";

export const habitLogModel={

    markComplete:async(user_id,habit_id,log_date,note)=>{
        const result=await pool.query(
            `Insert Into habit_logs(user_id,habit_id,log_date,note)
            Values($1,$2,$3,$4) Returning *`,
            [user_id,habit_id,log_date,note]
        )
        return result.rows[0]
    },

    unMark:async(user_id,habit_id,log_date)=>{
        const result=await pool.query(
            `Delete from habit_logs where habit_id=$1 And user_id=$2 And log_date=$3`,
            [habit_id,user_id,log_date]
        )
        return result.rows[0]
    },
    getHabitLogs:async(habit_id,user_id)=>{
        const result=await pool.query(
            `Select * from habit_logs where habit_id=$1 And user_id=$2 order by log_date desc`,
            [habit_id,user_id]
        )
        return result.rows
    },
    getHabitLogDates:async(habit_id,user_id)=>{
        const result=await pool.query(
            `Select log_date from habit_logs where habit_id=$1 And user_id=$2 order by log_date ASC`,
            [habit_id,user_id]
        )
        return result.rows
    },
     getToday: async (log_date, user_id) => {
        const result = await pool.query(
            `SELECT 
                h.id,
                h.title,
                h.icon,
                h.color,
                h.category,
                CASE WHEN hl.id IS NOT NULL THEN TRUE ELSE FALSE END AS completed
             FROM habits h
             LEFT JOIN habit_logs hl 
                ON h.id = hl.habit_id 
                AND hl.log_date = $1 
                AND hl.user_id = $2
             WHERE h.user_id = $2 AND h.is_archived = FALSE
             ORDER BY h.created_at DESC`,
            [log_date, user_id]
        )
        return result.rows
    },
    getRangeLogs: async (user_id, start, end) => {
        const result = await pool.query(
            `SELECT * FROM habit_logs
             WHERE user_id = $1 AND log_date BETWEEN $2 AND $3
             ORDER BY log_date DESC`,
            [user_id, start, end]
        )
        return result.rows
    },
    getLogByDates:async(user_id,date_keys)=>{
        const result=await pool.query(
            `SELECT log_date,habit_id from habit_logs where user_id=$1 log_date= ANY($2::date[])
            Order by log_date ASC`,
            [user_id,date_keys]
        )
        return result.rows
    }

}