import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

export const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            name:user.name,
            email:user.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRES
        }
    )
}

export const generateRefreshToken=(user)=>{
    return jwt.sign(
        {
            id:user.id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRES
        }
    )
}