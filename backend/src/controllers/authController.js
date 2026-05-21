import { userModel } from "../model/userModel.js";
import { refreshTokenModel } from "../model/refreshTokenModel.js";
import bcrypt from 'bcrypt'
import { generateAccessToken,generateRefreshToken } from "../service/generateToken.js";

//register
export const register=async(req,res,next)=>{
    try{
    const { name, email, password } = req.body

        const existingUser=await userModel.findUserByEmail(email)
        if(existingUser){
           res.status(409)
           throw new Error('Email already registered')
        }
        const hashPassword=await bcrypt.hash(password,10)
        const user= await userModel.createUser(name,email,hashPassword)
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

        const accessToken= generateAccessToken(user)
        const refreshToken= generateRefreshToken(user)

        const refreshExpiry = new Date();
        refreshExpiry.setDate(refreshExpiry.getDate() + 7);

        await refreshTokenModel.storeRefreshToken(user.id,refreshToken,refreshExpiry)
        

        if(!isMatch){
            res.status(401)
            throw new Error('Invalid Credentials')
        }
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

//logout