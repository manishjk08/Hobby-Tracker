
import type { Habit } from "../types/type";

type HabitCardProps = {
  habit: Habit;
  onMenuClick: () => void;
};

const Card = ({ habit, onMenuClick }: HabitCardProps) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-5 py-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${habit.color}20` }}
        >
          {habit.icon}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 text-base">
              {habit.title}
            </h3>

            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
              {habit.category}
            </span>
          </div>

         
          <p className="text-sm text-gray-500 mt-1">
            {habit.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-400">
          <span>🔥</span>
          <span>0</span>
        </div>

        <button
          onClick={onMenuClick}
          className="text-xl text-gray-400 hover:text-gray-600 transition"
        >
          ⋯
        </button>

        <button className="w-10 h-10 rounded-full border-2 border-yellow-400 flex items-center justify-center text-yellow-500 hover:bg-yellow-50 transition">
          ✓
        </button>
      </div>
    </div>
  );
};

export default Card;