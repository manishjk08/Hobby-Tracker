import pool from "../config/db.js";

export const refreshTokenModel={
    storeRefreshToken:async(user_id,token,expires_at)=>{
        const result=await pool.query(
            `Insert into refresh_tokens (user_id,token,expires_at)
            Values($1,$2,$3)`,
            [user_id,token,expires_at]
        )

    },

}