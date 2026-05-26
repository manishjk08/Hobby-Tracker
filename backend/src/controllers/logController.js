import { habitModel } from '../model/habitModel.js'
import { habitLogModel } from '../model/habitLog.js'
import { todayKey,last90Days,lastNdays,calculateStreak } from '../service/dateHelpers.js'
import { format } from 'date-fns';

export const markComplete=async(req,res,next)=>{
    try {

      const{habit_id,log_date,note}=req.body;
      const completedDate= log_date||todayKey() 
      const habit=await habitModel.findHabitById(habit_id) 
      if(!habit){
        res.status(404)
        throw new Error("Habit not found")
      }
      await habitLogModel.markComplete(req.user.id,habit_id,completedDate,note)
      const rawDates=await habitLogModel.getHabitLogDates(habit_id)
      const dates=rawDates.map(item=>
        format(item.log_date,'yyyy-MM-dd')
      )
      const streak=calculateStreak(dates)
      res.status(201).json({
        sucess:true,
        message:"log Updated",
        streak:streak
      })
    } catch (error) {
        next(error)
    }
}
export const unMark=async(req,res,next)=>{
    try {
        const{habit_id}=req.body
        const habit=await habitModel.findHabitById(habit_id)
        if(!habit){
            res.status(404)
            throw new Error('No habits found')
        }
        habitLogModel.unMark(req.user.id,habit_id)
        const dates=await habitLogModel.getHabitLogDates(habit_id)
        const streak=calculateStreak(dates)
        res.status(200).json(
            {
                sucess:true,
                message:'habits Unmarked',
                streak:streak
            }
        )
    } catch (error) {
        next(error)
    }
}

export const getToday=async(req,res,next)=>{
    try {
        const completedDate=todayKey()
        const log= await habitLogModel.getToday(completedDate,req.user.id)
        res.status(200).json(
            {
                sucess:true,
                message:"All todays habit log",
                data:log
            }
        )
    } catch (error) {
        next(error)
    }
}

export const getrange=async(req,res,next)=>{
    try {
        const{start,end}=req.query
        const completedDate=todayKey(start,end)
        const log=await habitLogModel.getToday(completedDate,req.user.id)
        res.status(200).json(
            {
                sucess:true,
                message:"range",
                data:log
            }
        )
    } catch (error) {
        next(error)
    }
}

