import { habitModel } from '../model/habitModel.js'
import { habitLogModel } from '../model/habitLog.js'
import { todayKey,last90Days,lastNdays,calculateStreak, currentWeekKeys } from '../service/dateHelpers.js'
import { format } from 'date-fns';

//mark complete
export const markComplete=async(req,res,next)=>{
    try {

      const{habit_id,log_date,note}=req.body;
      const completedDate= log_date||todayKey() 
      const habit=await habitModel.findHabitById(habit_id,req.user.id) 
      if(!habit){
        res.status(404)
        throw new Error("Habit not found")
      }
      const log=await habitLogModel.markComplete(req.user.id,habit_id,completedDate,note)
      if(!log){
        res.status(409)
            throw new Error('Habit already marked complete for this date')
      }
    //   const rawDates=await habitLogModel.getHabitLogDates(habit_id,req.user.id)
    //   const streak=calculateStreak(rawDates)
      res.status(201).json({
        success:true,
        message:"log Updated",
        data:{
            log,
        }
      })
    } catch (error) {
        next(error)
    }
}

//getStreak
export const getStreak=async(req,res,next)=>{
    try {

      
      const habit_id = parseInt(req.params.habit_id)
      const habit=await habitModel.findHabitById(habit_id,req.user.id) 
      if(!habit){
        res.status(404)
        throw new Error("Habit not found")
      }
      
      const rawDates=await habitLogModel.getHabitLogDates(habit_id,req.user.id)
      const streak=calculateStreak(rawDates)
      res.status(200).json({
        success:true,
        message:" Your Streak ",
        habit_id:habit_id,
        streak:streak
      })
    } catch (error) {
        next(error)
    }
}

//unmark
export const unMark=async(req,res,next)=>{
    try {
        const{habit_id,log_date}=req.body
        const targetDate=log_date || todayKey()
        const habit=await habitModel.findHabitById(habit_id,req.user.id)
        if(!habit){
            res.status(404)
            throw new Error('No habits found')
        }
        const deleted=await habitLogModel.unMark(req.user.id,habit_id,targetDate)
        if(!deleted){
            res.status(404)
            throw new Error('No log found for this date')
        }
        // const rawDates=await habitLogModel.getHabitLogDates(habit_id,req.user.id)
        // const streak=calculateStreak(rawDates)
        res.status(200).json(
            {
                success:true,
                message:'habits Unmarked',
                data:{
                    habit_id,
                    date:targetDate,
                }
            }
        )
    } catch (error) {
        next(error)
    }
}

export const getToday=async(req,res,next)=>{
    try {
        const today=todayKey()
        const log= await habitLogModel.getToday(today,req.user.id)
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

export const getRange=async(req,res,next)=>{
    try {
        const{start,end}=req.query
        const completedDate=todayKey(req.user.id,start,end)
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

export const dashboard=async(req,res,next)=>{
    try {
        const habits=await habitModel.getAllHabits(req.user.id)
        const logs=await habitLogModel.getAllLogs(req.user.id)

        let bestStreak=0
        let activeStreak=0

        for(const habit of habits){
            const rawDates= await habitLogModel.getHabitLogDates(
                habit.id,req.user.id
            )
            const streak=  calculateStreak(rawDates)
            bestStreak=Math.max(bestStreak,streak.longest||0)
            activeStreak=Math.max(activeStreak,streak.current||0)
        }
        
        
        const expectedCompletionsPerWeek=habits.length * 7
        const weekDays=currentWeekKeys()
        const countMap={};
        weekDays.forEach(d=>countMap[d]=0)
        logs.forEach(row=> {
            const key=format(row.log_date,'yyyy-MM-dd')
            if(countMap[key]!==undefined) countMap[key]+=1
        })
           const weekly=weekDays.map(day=>({
            completed:countMap[day]
           })).reduce((acc,item)=> acc+item.completed,0)
               
           const weeklyData=weekDays.map(day=>({
            date:day,
            completed:countMap[day]
           }))
       
        const weeklyCompletions=(weekly/expectedCompletionsPerWeek * 100).toFixed(2)
    
        res.status(200).json(
            {
                success:true,
                message:"Dashboard data",
                data:{
                    totalHabit:habits.length,
                    bestStreak,
                    activeStreak,
                    weeklyData,
                    weeklyCompletions
                    
                }
            }
        )
    } catch (error) {
        next(error)
    }
}
