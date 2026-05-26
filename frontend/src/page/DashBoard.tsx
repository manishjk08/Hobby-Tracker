const DashBoard = () => {
  return (
    <div className="space-y-5">

      
      <div>
        <h1 className="text-lg font-semibold tracking-tight text-black">
          Dashboard
        </h1>

        <p className="text-xs text-gray-500 mt-1">
          Welcome back. Track your habits and monitor progress.
        </p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
            Total Habits
          </p>

          <h2 className="text-2xl font-semibold mt-3 text-black">
            12
          </h2>

          <p className="text-[11px] text-gray-400 mt-1">
            Active routines
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
            Weekly Progress
          </p>

          <h2 className="text-2xl font-semibold mt-3 text-black">
            78%
          </h2>

          <p className="text-[11px] text-gray-400 mt-1">
            Completed this week
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <p className="text-[11px] font-medium uppercase tracking-wide text-gray-500">
            Current Streak
          </p>

          <h2 className="text-2xl font-semibold mt-3 text-black">
            16
          </h2>

          <p className="text-[11px] text-gray-400 mt-1">
            Consecutive days
          </p>
        </div>

      </div>

      
      <div className="bg-white border border-gray-200 rounded-xl p-5">

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
            Last 7 days
          </span>

        </div>

        
        <div className="flex items-end gap-2 h-40">

          {[40, 65, 55, 80, 70, 95, 60].map((height, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >

              <div className="w-full bg-gray-100 rounded-lg overflow-hidden h-full">
                <div
                  className="bg-black rounded-lg transition-all"
                  style={{ height: `${height}%` }}
                />
              </div>

              <span className="text-[10px] text-gray-400">
                {["M", "T", "W", "T", "F", "S", "S"][index]}
              </span>

            </div>
          ))}

        </div>

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