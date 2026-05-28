import type { Habit } from "../types/type";

type ActionMenuProps = {
  habit: Habit | null;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
};

const ActionMenu = ({
  habit,
  onClose,
  onDelete,
  onEdit,
}: ActionMenuProps) => {
  if (!habit) return null;

  return (
    <div className="absolute right-4 top-12 z-50">
      <div className="bg-white rounded-xl p-4 w-56 shadow-lg border">
        <h2 className="text-sm font-semibold mb-3">
          {habit.title}
        </h2>

        <div className="flex flex-col gap-2">
          <button
            className="w-full py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200"
            onClick={() => onEdit(habit)}
          >
            Edit
          </button>

          <button
            className="w-full py-2 text-sm rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
            onClick={onClose}
          >
            Archive
          </button>

          <button
            className="w-full py-2 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
            onClick={() => onDelete(habit.id)}
          >
            Delete
          </button>

          <button
            className="w-full py-2 text-sm rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
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