import jwt from 'jsonwebtoken'


export const generateAccessToken=(user)=>{
    return jwt.sign(
        {
            id:user.id,
            name:user.name,
            email:user.email,

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:parseInt(process.env.ACCESS_TOKEN_EXPIRES)
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
            expiresIn:parseInt(process.env.REFRESH_TOKEN_EXPIRES)
        }
    )
}
export const verifyAccessToken=(token)=>{
    try {
        return jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired access token.');
    }
}

export const verifyRefreshToken=(token)=>{
    try {
        return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    } catch (error) {
        throw new Error('Invalid or expired refresh token.');
    }
}