import { useEffect, useState } from "react";
import Form from "../components/Form";
import Card from "../components/Card";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { archiveHabit, delHabit, getActiveHabit, getArchiveHabit, restoreHabit } from "../slices/HabitSlice";
import type { Habit } from "../types/type";
import ActionMenu from "../components/ActionMenu";
import { getStreak, markComplete, unMark } from "../slices/HabitLogSlice";



const Habits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [menuHabit, setMenuHabit] = useState<Habit | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  
  const { habits } = useAppSelector((state) => state.habit);
  const {habitLog}=useAppSelector((state)=>state.habitLog)
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
  const handleArchive=(id:number)=>{
    dispatch(archiveHabit({id}));
    closeMenu();
  }
  const handleRestore=(id:number)=>{
    dispatch(restoreHabit({id}))
    closeMenu();
  }
  const handleMark=(id:number)=>{
    dispatch(markComplete({id})).then(()=>{
      dispatch(getStreak(id))
      dispatch(getActiveHabit())
      
    })
  }
  const handleUnMark=(id:number)=>{
    dispatch(unMark({id})).then(()=>{
      dispatch(getStreak(id))
      dispatch(getActiveHabit())
      
    })
  }

  useEffect(()=>{
    habits.forEach(habit=>{
      dispatch(getStreak(habit.id))
    })
  },[habits])

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
    <div className="w-full text-black text-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-sm font-medium tracking-wide uppercase">
          Habits
        </h1>

        <button
          onClick={openCreateModal}
          className="px-3 py-1.5 border border-black rounded-md text-xs hover:bg-black hover:text-white transition"
        >
          + Add Habit
        </button>
      </div>
      
      <div className="flex gap-2 mb-6 justify-end">
        <button
          onClick={() => setIsActive(true)}
          className={`px-3 py-1 border rounded-md text-xs transition ${
            isActive
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setIsActive(false)}
          className={`px-3 py-1 border rounded-md text-xs transition ${
            !isActive
              ? "bg-black text-white border-black"
              : "bg-white text-black border-black"
          }`}
        >
          Archive
        </button>
      </div>

      <div>
        {habits.length === 0 && (
          <h1 className="text-xs text-center text-neutral-500 my-10 tracking-wide">
            No habits
          </h1>
        )}
      </div>
        <main className="bg-white rounded-xl mb-10 p-5">
          <h1 className="text-sm font-medium text-black mb-1">
            Your Habits
          </h1>
          
          <div className="space-y-3 p-1 relative ">
        {habits.map((habit) => {
          const logEntry = habitLog.find(item => item.habit_id === habit.id)
          const streak = logEntry?.streak.current ?? 0
          return(
          <Card
            key={habit.id}
            habit={habit}
            streak={streak}
            onMenuClick={() => openMenu(habit)}
            onMark={handleMark}
            onUnmark={handleUnMark}
          />
          )
         })}
          
        <ActionMenu
          habit={menuHabit}
          onClose={closeMenu}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onArchive={handleArchive}
          onRestore={handleRestore}
        />
      </div>
        </main>
      

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white border border-black rounded-xl p-4 w-100 shadow-sm">
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