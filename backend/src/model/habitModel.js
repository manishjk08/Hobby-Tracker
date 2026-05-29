import pool from "../config/db.js";
import { todayKey } from "../service/dateHelpers.js";

export const habitModel={

    getAllHabits:async(user_id)=>{
        const result= await pool.query(
            `Select * from habits where user_id=$1 Order By createdat Desc`,
            [user_id]
        )
        return result.rows
    },
    createHabit:async(user_id,title,description,category,icon,color,frequency,targetdaysperweek)=>{
        const result=await pool.query(
            `Insert into habits (user_id,title,description,category,icon,color,frequency,targetdaysperweek) Values
            ($1,$2,$3,$4,$5,$6,$7,$8) Returning *`,
            [user_id,title,description,category,icon,color,frequency,targetdaysperweek]
        )
        return result.rows[0]
    },
    updateHabit: async(
    id,
    user_id,
    title,
    description,
    category,
    frequency,
    targetdaysperweek,
    icon,
    color,
    
) => {
    const result = await pool.query(
        `UPDATE habits 
         SET 
             title = $1,
             description = $2,
             category = $3,
             frequency = $4,
             targetdaysperweek = $5,
             icon = $6,
             color = $7
         WHERE id = $8 AND user_id = $9
         RETURNING *`,
        [title, description, category, frequency, targetdaysperweek, 
         icon, color, id, user_id]
    );
    return result.rows[0];
},
findHabitById:async(id,user_id)=>{
    const result= await pool.query(
        `Select * from habits Where id=$1 AND user_id=$2 `,
        [id,user_id]
    );
    return result.rows[0]
},

deleteHabit:async(id,user_id)=>{
    const result=await pool.query(
        `Delete from habits where id=$1 And user_id=$2`,
        [id,user_id]
    );
    return result.rows[0]
},

archiveHabit:async(id,user_id)=>{
    const result=await pool.query(
        `Update  habits Set isarchived=TRUE where id=$1 And user_id=$2 AND isarchived=FALSE Returning *`,
        [id,user_id]
    );
    return result.rows[0]
},
restoreHabit:async(id,user_id)=>{
    const result=await pool.query(
        `Update habits set isarchived=FALSE where id=$1 AND user_id=$2 AND isarchived=TRUE RETURNING *`,
        [id,user_id]
    )
    return result.rows[0]
},
getArchivedHabits:async(user_id)=>{
    const result=await pool.query(
        `Select * from habits where user_id=$1 AND isarchived=TRUE Order By createdat Desc`,
        [user_id]
    )
    return result.rows
},

getActivehabits: async (user_id) => {
    const result = await pool.query(
        `SELECT h.*,
            CASE WHEN hl.id IS NOT NULL THEN TRUE ELSE FALSE END AS completed
         FROM habits h
         LEFT JOIN habit_logs hl
            ON h.id = hl.habit_id
            AND hl.log_date = $2
            AND hl.user_id = $1
         WHERE h.user_id = $1 AND h.isarchived = FALSE
         ORDER BY h.createdat DESC`,
        [user_id, todayKey()]
    )
    return result.rows
}

}