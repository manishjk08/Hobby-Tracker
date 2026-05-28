import { useEffect, useState } from "react";
import Form from "../components/Form";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { delHabit, getActiveHabit, getArchiveHabit } from "../slices/HabitSlice";
import type { Habit } from "../types/type";
import ActionMenu from "../components/ActionMenu";

const Habits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [menuHabit, setMenuHabit] = useState<Habit | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const { habits } = useAppSelector((state) => state.habit);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isActive) {
      dispatch(getActiveHabit());
    } else {
      dispatch(getArchiveHabit());
    }
  }, [dispatch, isActive]);

  const handleDelete = (id: number) => {
    dispatch(delHabit({ id }));
    closeMenu();
  };

  const handleEdit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
    closeMenu();
  };

  const openMenu = (habit: Habit) => {
    setMenuHabit(habit);
  };

  const closeMenu = () => {
    setMenuHabit(null);
  };

  const openCreateModal = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold">Habits</h1>

        <button
          onClick={openCreateModal}
          className="px-3 py-2 bg-black text-white rounded"
        >
          + Add Habit
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setIsActive(true)}
          className={`px-3 py-1 border rounded ${
            isActive ? "bg-black text-white" : ""
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setIsActive(false)}
          className={`px-3 py-1 border rounded ${
            !isActive ? "bg-black text-white" : ""
          }`}
        >
          Archive
        </button>
      </div>

      <div>
        {habits.length === 0 && (
          <h1 className="text-2xl text-center m-4">
            No habits
          </h1>
        )}
      </div>

      <div className="space-y-4 p-4 relative">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            habit={habit}
            onMenuClick={() => openMenu(habit)}
          />
        ))}
        <ActionMenu
          habit={menuHabit}
          onClose={closeMenu}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-100">
            <Form
              onClose={closeModal}
              editingHabit={editingHabit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Habits;