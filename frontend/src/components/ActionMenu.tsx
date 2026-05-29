import type { Habit } from "../types/type";

type ActionMenuProps = {
  habit: Habit | null;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
  onArchive:(id:number)=>void;
  onRestore:(id:number)=>void;
};

const ActionMenu = ({
  habit,
  onClose,
  onDelete,
  onEdit,
  onArchive,
  onRestore,
}: ActionMenuProps) => {
  if (!habit) return null;

  return (
    <div className="absolute right-2 top-12 z-50">
      <div className="bg-white rounded-2xl p-3 w-48 shadow-lg shadow-black/5 border border-neutral-200">
        
        <h2 className="text-xs font-medium tracking-wide mb-3 pb-2 border-b border-neutral-100 truncate text-black">
          {habit.title}
        </h2>

        <div className="flex flex-col gap-1.5 text-xs">
          
          <button
            className="w-full py-2 rounded-xl hover:bg-neutral-100 transition text-black"
            onClick={() => onEdit(habit)}
          >
            Edit
          </button>

          <button
          className={`w-full py-2 rounded-xl transition ${
          habit.isarchived
          ? "hover:bg-green-100 text-green-600"
          : "hover:bg-yellow-100 text-yellow-600"
          }`}
          onClick={() =>
          habit.isarchived
          ? onRestore(habit.id)
          : onArchive(habit.id)
          }
          >
          {habit.isarchived ? "Restore" : "Archive"}
          </button>

          <button
            className="w-full py-2 rounded-xl hover:bg-neutral-100 transition text-black"
            onClick={() => onDelete(habit.id)}
          >
            Delete
          </button>

          <button
            className="w-full py-2 text-neutral-400 hover:text-black transition"
            onClick={onClose}
          >
            Cancel
          </button>

        </div>
      </div>
    </div>
  );
};

export default ActionMenu;