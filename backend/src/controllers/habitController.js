
import { habitModel } from "../model/habitModel.js";



//create habit

export const createHabit=async(req,res,next)=>{
    try {
        const {title,description,category,icon,color,frequency,targetdaysperweek}=req.body
        
        const habit=await habitModel.createHabit(req.user.id,title,description,category,icon,
                    color,frequency,targetdaysperweek)

                    res.status(201).json(
                        {
                            success:true,
                            message:'Habit Created',
                            data:habit

                        }
                    )

    } catch (error) {
        next(error)
    }
}
//get All habits

export const getHabit=async(req,res,next)=>{
    try {
        const habits=await habitModel.getAllHabits(req.user.id)
        if(!habits){
            throw new Error('No habit to show')
        }
        res.status(200).json(
            {
                success:true,
                message:"Your habits",
                data:habits
            }
        )
    } catch (error) {
        next(error)
    }
}

//get Active habits
export const getActiveHabit=async(req,res,next)=>{
    try {
        const habits=await habitModel.getActivehabits(req.user.id)
        if(!habits){
            throw new Error('No active habits to show')
        }
        res.status(200).json(
            {
                success:true,
                message:"Your active habits",
                data:habits
            }
        )
    } catch (error) {
        next(error)
    }
}

// get archived habits
export const getArchivedHabit=async(req,res,next)=>{
    try {
        const habits=await habitModel.getArchivedHabits(req.user.id)
        if(!habits){
            throw new Error('No archived habits to show')
        }
        res.status(200).json(
            {
                success:true,
                message:"Your archived habits",
                data:habits
            }
        )
    } catch (error) {
        next(error)
    }
}

//Update habit

export const updateHabit=async(req,res,next)=>{
    
    try {
        const{ id }=req.params
        const {title,description,category,icon,color,frequency,targetdaysperweek}=req.body

        const existingHabit=await habitModel.findHabitById(id)
        if(!existingHabit){
            res.status(404)
            throw new Error('No Habits to update')
        }
        const updatedHabits= await habitModel.updateHabit(
            id,
            req.user.id,
            title,
            description,
            category,
            frequency,
            targetdaysperweek,
            icon,
            color
    )
    res.status(201).json({
        success:true,
        message:"Habits updated",
        data:updatedHabits
    })
    } catch (error) {
        next(error)
    }
}

//delete

export const deleteHabit=async(req,res,next)=>{
    try {
        const{ id }=req.params
        const existingHabit=await habitModel.findHabitById(id)
        if(!existingHabit){
            res.status(404)
            throw new Error('No habits to delete')
        }
        await habitModel.deleteHabit(id,req.user.id)
        res.status(200).json(
            {
                success:true,
                message:'Habits deleted successfully'
                
            }
        )
    } catch (error) {
        next(error)
    }
}

//ArchiveHabits
export const archiveHabit=async(req,res,next)=>{
    try {
        const { id }=req.params
        const habits=await habitModel.findHabitById(id)
        if(!habits){
            res.status(404)
            throw new Error('Habits not found')
        }
        const archivedHabits=await habitModel.archiveHabit(id,req.user.id)
        if(!archivedHabits){
            res.status(403)
            throw new Error('Not Authorize to archive')
        }
        res.status(200).json(
            {
                success:true,
                message:'Movied to archived',
                data:archivedHabits
            }
        )
    } catch (error) {
        next(error)
    }
}

//restorehabit

export const restoreHabit=async(req,res,next)=>{
    try {
        const { id }=req.params
        const habits=await habitModel.findHabitById(id)
        if(!habits){
            res.status(404)
            throw new Error('Habits not found')
        }
        const restorehabit=await habitModel.restoreHabit(id,req.user.id)
        if(!restorehabit){
            res.status(403)
            throw new Error('Not Authorize to restore')
        }
        res.status(200).json(
            {
                success:true,
                message:'Movied to activeHabits',
                data:restorehabit
            }
        )
    } catch (error) {
        next(error)
    }
}