import { habitModel } from '../model/habitModel.js'
import { habitLogModel } from '../model/habitLog.js'
import { todayKey,last90Days,lastNdays,calculateStreak } from '../service/dateHelpers.js'

export const markComplete=async(req,res,next)=>{
    try {

      const{habit_id,log_date,completed,note}=req.body;
      const completedDate= log_date||todayKey() 
      const habit=await habitModel.findHabitById(habit_id) 
      if(!habit){
        res.status(404)
        throw new Error("Habit not found")
      }
      const log=await habitLogModel.CreateLog(req.user.id,habit_id,completedDate,completed,note)
      res.status(201).json({
        sucess:true,
        message:"log Updated",
        data:log
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
        const log=habitLogModel.unMark(req.user.id,habit_id)
        res.status(200).json(
            {
                sucess:true,
                message:'habits Unmarked',
            }
        )
    } catch (error) {
        next(error)
    }
}