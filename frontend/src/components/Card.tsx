import type { Habit } from "../types/type";

type HabitCardProps = {
  habit: Habit;
  streak:number,
  onMenuClick: () => void;
  onMark:(id:number)=>void
  onUnmark:(id:number)=>void;
};

const Card = ({ habit, onMenuClick,onMark,onUnmark,streak }: HabitCardProps) => {

const completed=habit.completed

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl px-4 py-3 border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition">
      
      <div className="flex items-center gap-3 min-w-0">
        
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-lg border border-neutral-200"
          style={{ backgroundColor: `${habit.color}10` }}
        >
          {habit.icon}
        </div>

        <div className="flex flex-col min-w-0">
          
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm font-medium text-black truncate">
              {habit.title}
            </h3>

            <span className="text-[10px] text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full uppercase tracking-wide">
              {habit.category}
            </span>
          </div>

          <p className="text-xs text-neutral-400 mt-1 truncate max-w-55">
            {habit.description}
          </p>

        </div>
      </div>

      <div className="flex items-center gap-3">
        
        <div className="flex items-center gap-1 text-[11px] text-neutral-400">
          <span>🔥</span>
          <span>{streak}</span>
        </div>

        <button
          onClick={onMenuClick}
          className="text-base text-neutral-500 hover:text-black transition"
        >
          ⋯
        </button>

        <button
            onClick={() => completed ? onUnmark(habit.id) : onMark(habit.id)}
            className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition
                ${completed
                    ? 'bg-black text-white border-black'  
                    : 'border-neutral-300 text-black hover:bg-black hover:text-white hover:border-black'
                }`}
        >
            ✓
        </button>

      </div>
    </div>
  );
};

export default Card;