import { userModel } from "../model/userModel.js";
import { refreshTokenModel } from "../model/refreshTokenModel.js";
import bcrypt from 'bcrypt'
import { generateAccessToken,generateRefreshToken,verifyRefreshToken } from "../service/generateToken.js";
import { refreshCookieOptions } from "../service/cookieOptions.js";

//register
export const register=async(req,res,next)=>{
    try{
    const { name, email, password } = req.body

        const existingUser=await userModel.findUserByEmail(email)
        if(existingUser){
           res.status(409)
           throw new Error('Email already registered')
        }
        const hashpassword=await bcrypt.hash(password,10)
        const user= await userModel.createUser(name,email,hashpassword)
        res.status(201).json({
            success:true,
            message:'User Registered Successfully.. You can login now',
            data:user
        })

    } catch (error) {
        next (error)
    }
}

//Login

export const login=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        const user=await userModel.findUserByEmail(email)

        if(!user){
            res.status(401)
            throw new Error('Invalid Credentials')
        }

        const isMatch=await bcrypt.compare(password,user.hashpassword)
        if(!isMatch){
            res.status(401)
            throw new Error('Invalid Credentials')
        }

        const accessToken= generateAccessToken(user)
        const refreshToken= generateRefreshToken(user)

        const refreshExpiry = new Date();
        refreshExpiry.setDate(refreshExpiry.getDate() + 7);

        await refreshTokenModel.storeRefreshToken(user.id,refreshToken,refreshExpiry)

        res.cookie('refreshToken',refreshToken,refreshCookieOptions)

        
        res.status(200).json({
            success:true,
            message:'Login Successfull',
            data:{
                id:user.id,
                name:user.name,
                email:user.email,
                createdAt:user.createdat,
                accessToken:accessToken,
            }
        })
    } catch (error) {
        next(error)
    }
}

//Get  CurrentUser

export const getCurrentUser=async(req,res,next)=>{
    try {
        const user = await userModel.findUserById(req.user.id)
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
        
        res.status(200).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdat
            }
        })
    } catch (error) {
        next(error)
    }
}

//logout
export const logout=async(req,res,next)=>{
    try {
    const refreshToken=req.cookies.refreshToken
    if(refreshToken){
        await refreshTokenModel.deleteRefreshToken(refreshToken)
    }
    res.clearCookie('refreshToken',refreshCookieOptions)
    res.status(200).json({
        success:true,
        message:"Logout successfully"
    })
    } catch (error) {
        next(error)
    }
}

//Refresh Token
export const refreshToken=async(req,res,next)=>{
    try {
        const refreshToken=req.cookies.refreshToken
        if(!refreshToken){
            res.status(401)
            throw new Error('No refresh token')
        }

        const stored=await refreshTokenModel.findByRefreshToken(refreshToken)
        if(!stored){
            res.status(401)
            throw new Error ("Invalid or expored refresh token")
        }

        const decoded=verifyRefreshToken(refreshToken)

        const user=await userModel.findUserById(decoded.id)

        const newAccessToken=generateAccessToken(user)

        res.status(200).json(
            {
                success:true,
                data:{
                    accessToken:newAccessToken
                }
            }
        )
    } catch (error) {
        next(error)
    }
}
