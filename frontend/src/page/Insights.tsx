import  { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { fetchInsights } from '../slices/AiSlice'

const Insights = () => {
const dispatch=useAppDispatch()
const{insights}=useAppSelector(state=>state.ai )
const {habits}=useAppSelector(state=>state.habit)
const {dashboard}=useAppSelector(state=>state.dashboard)
useEffect(() => {
  if (habits && habits.length > 0) {
    dispatch(fetchInsights({
      totalHabits:habits.length,
        completionRate: dashboard?.weeklyCompletions??0,
        currentStreak: dashboard?.activeStreak??0,
        longestStreak: dashboard?.bestStreak??0,
        bestHabit: '',
        worstHabit: '',
        weeklyCompletions: []  
    }
        
    ));
  }
}, [dispatch, habits]);


  return (
    <div>
      Insights Page
        {insights ? (   
        <div>
            <h2>Summary</h2>
            <p>{insights.summary}</p>

            <h3>Win</h3>
            <p>{insights.win || 'No wins yet. Keep going!'}</p>

            <h3>Warning</h3>
            <p>{insights.warning || 'No warnings. You are doing great!'}</p>


            <h3>Tip</h3>
            <p>{insights.tip}</p>
        </div>
        ) : (
            <p>Loading insights...</p>
        )}
    </div>
  )
}

export default Insights
