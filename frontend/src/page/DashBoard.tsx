
import WorkingCard from "../components/WorkingCard";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { useEffect } from "react";

import { fetchDashboard } from "../slices/DashboardSlice";
import BarChart from "../components/BarChart";


const DashBoard = () => {
  
  const dispatch=useAppDispatch()
  const {dashboard}=useAppSelector(state=>state.DashBoard)
  const {user}=useAppSelector(state=>state.auth)

useEffect(()=>{
  dispatch(fetchDashboard())
},[dispatch])

const today = new Date().toISOString().split("T")[0]

const completedToday =
  dashboard?.weeklyData.find(item => item.date === today)?.completed ?? 0

const totalHabit = dashboard?.totalHabit ?? 0

const pendingToday = totalHabit - completedToday
  return (
    <div className="space-y-5">

      
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-black">
          Hey {user?.name}
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Welcome back. Track your habits and monitor progress.
        </p>
        <p className="text-2xl text-gray-500 mt-2">
          {completedToday} completed, {pendingToday} pending 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <WorkingCard title={"Total habits"} value={dashboard?.totalHabit?? 0}/>
        <WorkingCard title={"Active Streak"} value={dashboard?.activeStreak??0}/>
        <WorkingCard title={"Best Streak"} value={dashboard?.bestStreak??0}/>
        <WorkingCard title={"This Week"} value={dashboard?.weeklyCompletions??0} suffix="%"/>
      </div>
      

      
      <div className="bg-white border border-gray-200 rounded-xl p-5 w-2/4">

        <div className="flex items-center justify-between mb-5">

          <div>
            <h2 className="text-sm font-semibold text-black">
              Weekly Activity
            </h2>

            <p className="text-[11px] text-gray-500 mt-1">
              Habit completion overview
            </p>
          </div>

          <span className="text-[11px] text-gray-400">
            This week
          </span>

        </div>
        <BarChart/>
      </div>

      
      <div className="bg-white border border-gray-200 rounded-xl p-5">

        <div className="mb-5">
          <h2 className="text-sm font-semibold text-black">
            Recent Activity
          </h2>

          <p className="text-[11px] text-gray-500 mt-1">
            Latest updates from your habits
          </p>
        </div>

        <div className="space-y-3">

          {[
            "Completed Morning Workout",
            "Read for 30 minutes",
            "Meditation streak reached 10 days",
            "Finished daily water goal",
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-none last:pb-0"
            >

              <div className="w-7 h-7 rounded-md bg-gray-100 flex items-center justify-center text-[10px]">
                ✓
              </div>

              <div>
                <p className="text-xs text-black">
                  {activity}
                </p>

                <p className="text-[10px] text-gray-400 mt-0.5">
                  Today
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default DashBoard;