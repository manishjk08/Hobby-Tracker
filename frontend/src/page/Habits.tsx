import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../app/hook";
import type { Habit, HabitInput } from "../types/type";
import { Frequencies, Categories } from "../types/type";
import { createHabit, delHabit, EditHabit, archiveHabit, getActiveHabit, getArchiveHabit } from "../slices/HabitSlice";




const Habits = () => { 
    const dispatch = useAppDispatch();
    const { habits, loading, error } = useAppSelector((state) => state.habit);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null)
    const [editingHabit, setEditingHabit] = useState<Habit | null>(null)
    const [isDone, setIsDone] = useState<number[]>([])
    const[isActive,setIsActive]=useState(true)

    const { register, handleSubmit, reset, watch } =
        useForm<HabitInput>();

    useEffect(() => {
        if(isActive){
            dispatch(getActiveHabit());
        } else{
        dispatch(getArchiveHabit())
    }
    }, [dispatch,isActive]);

    const onSubmit: SubmitHandler<HabitInput> = async (data) => {
        if (editingHabit) {
            await dispatch(EditHabit({
                id: editingHabit.id,
                title: data.title,
                category: data.category,
                frequency: data.frequency,
                icon: data.icon,
                color: data.color,
                targetdaysperweek: data.targetdaysperweek,
                description: data.description
            })).unwrap();
        } else {
            await dispatch(createHabit(data)).unwrap();
        }
        setEditingHabit(null)
        reset();
        setIsModalOpen(false);
        dispatch(getActiveHabit())
    };

    const handleDelete = async (id: number) => {
        if (confirm("Delete this habit?")) {
            await dispatch(delHabit({ id })).unwrap();
        }
        dispatch(getActiveHabit())
    };
    const handleArchive = async (id: number) => {
    await dispatch(archiveHabit({ id })).unwrap();

    if (isActive) {
        dispatch(getActiveHabit());
    } else {
        dispatch(getArchiveHabit());
    }
};
   
    const toggleDone=(id:number)=>{
        setIsDone((prev)=>
            prev.includes(id)
        ?prev.filter((habit_id)=>habit_id!==id)
        :[...prev,id]
        )
    }

    return (
        <div className="w-full">


            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-lg font-semibold tracking-tight text-black">
                        Habits
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        Manage and track your daily routines
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition-all"
                >
                    Add Habit
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-[11px] text-gray-500">Total Habits</p>
                    <h3 className="text-lg font-semibold text-black mt-1">{habits.length}</h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-[11px] text-gray-500">Active Streak</p>
                    <h3 className="text-lg font-semibold text-black mt-1">0</h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-[11px] text-gray-500">Best Streak</p>
                    <h3 className="text-lg font-semibold text-black mt-1">0</h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <p className="text-[11px] text-gray-500">Weekly Progress</p>
                    <h3 className="text-lg font-semibold text-black mt-1">0%</h3>
                </div>

            </div>
            {error && (
                <div className="mb-4 border border-red-200 bg-red-50 text-red-600 text-xs px-3 py-2 rounded-md">
                    {error}
                </div>
            )}

            {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="w-3 h-3 border border-gray-300 border-t-black rounded-full animate-spin"></div>
                    <span>Loading habits...</span>
                </div>
            )}
              <div className="flex gap-3 justify-end my-2 mx-8">
            <button
                onClick={() => setIsActive(true)}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 font-small
                ${
                    isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
            >
                Active
            </button>
            <button
                onClick={() => setIsActive(false)}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 font-small
                ${
                    !isActive
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300"
                }`}
            >
                Archive
            </button>
    </div>
           
            {!loading && habits?.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    {isActive}
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr className="text-[11px] uppercase tracking-wide text-gray-500">
                                <th className="text-left font-medium px-5 py-3">
                                    Habit
                                </th>

                                <th className="text-left font-medium px-5 py-3">
                                    Category
                                </th>

                                <th className="text-left font-medium px-5 py-3">
                                    Frequency
                                </th>

                                <th className="text-left font-medium px-5 py-3">
                                    Target
                                </th>

                                <th className="text-left font-medium px-5 py-3">
                                    Description
                                </th>

                                <th className="w-20">
                                    Action
                                </th>
                                <th>
                                    Chectout
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {habits.map((habit: Habit) => (
                                <tr
                                    key={habit.id}
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >


                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">

                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center text-sm border border-gray-200"
                                                style={{
                                                    backgroundColor:
                                                        habit.color || "#f5f5f5",
                                                }}
                                            >
                                                {habit.icon}
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-medium text-black">
                                                    {habit.title}
                                                </h3>

                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    Habit tracker
                                                </p>
                                            </div>

                                        </div>
                                    </td>


                                    <td className="px-5 py-4">
                                        <span className="text-xs text-gray-600">
                                            {habit.category}
                                        </span>
                                    </td>


                                    <td className="px-5 py-4">
                                        <span className="text-xs text-gray-600">
                                            {habit.frequency}
                                        </span>
                                    </td>


                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">

                                            <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className="h-full bg-black rounded-full"
                                                    style={{
                                                        width: `${(habit.targetdaysperweek / 7) * 100
                                                            }%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="text-[11px] text-gray-500">
                                                {habit.targetdaysperweek}/7
                                            </span>

                                        </div>
                                    </td>


                                    <td className="px-5 py-4">
                                        <p className="text-xs text-gray-500 max-w-xs truncate">
                                            {habit.description || "No description"}
                                        </p>
                                    </td>


                                    <td className="px-5 py-4 w-20 relative">
                                        <div >
                                            <div
                                                onClick={() =>
                                                    setOpenMenuId(openMenuId === habit.id ? null : habit.id)
                                                }
                                                className="font-bold cursor-pointer select-none px-2 py-1 text-gray-500 hover:text-black"
                                            >
                                                ...
                                            </div>

                                            {openMenuId === habit.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-sm z-50">

                                                    <button
                                                        onClick={() => {
                                                            handleDelete(habit.id);
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Delete 🚨
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            setEditingHabit(habit)
                                                            reset({
                                                                title: habit.title,
                                                                category: habit.category,
                                                                frequency: habit.frequency,
                                                                icon: habit.icon,
                                                                color: habit.color,
                                                                targetdaysperweek: habit.targetdaysperweek,
                                                                description: habit.description
                                                            });
                                                            setIsModalOpen(true)
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Edit ✏️
                                                    </button>

                                                    <button
                                                        onClick={() => {
                                                            handleArchive(habit.id)
                                                            setOpenMenuId(null);
                                                        }}
                                                        className="w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Archive 🗂️
                                                    </button>

                                                    <div className="border-t border-gray-100" />

                                                    <button
                                                        onClick={() => setOpenMenuId(null)}
                                                        className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-black hover:bg-gray-50"
                                                    >
                                                        Cancel ❌
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <button
    onClick={() => toggleDone(habit.id)}
    className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer transition-all duration-200
    ${
        isDone.includes(habit.id)
            ? "bg-white text-black border-black"
            : "bg-black text-white border-black"
    }`}
>
    ✓
</button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            )}
       


            {!loading && habits?.length === 0 && (
                <div className="bg-white border border-gray-200 rounded-xl py-20 text-center">

                    <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 flex items-center justify-center text-xl mb-4">
                        📋
                    </div>

                    <h3 className="text-sm font-medium text-black">
                        No habits yet
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                        Create your first habit to start tracking progress
                    </p>

                </div>
            )}


            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setIsModalOpen(false)}
                >

                    <div
                        className="w-full max-w-md bg-white rounded-xl border border-gray-200 shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    >


                        <div className="px-5 py-4 border-b border-gray-100">

                            <h2 className="text-sm font-semibold text-black">
                                Create Habit
                            </h2>

                            <p className="text-[11px] text-gray-500 mt-1">
                                Add a new habit to your routine
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-5 space-y-4"
                        >


                            <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                    Title
                                </label>

                                <input
                                    placeholder="Morning Meditation"
                                    className="w-full h-9 px-3 rounded-md border border-gray-200 text-xs outline-none focus:border-black transition-colors"
                                    {...register("title", { required: true })}
                                />
                            </div>


                            <div className="grid grid-cols-2 gap-3">

                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                        Category
                                    </label>

                                    <select
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-xs outline-none focus:border-black transition-colors"
                                        {...register("category", { required: true })}
                                    >
                                        <option value="">Select</option>

                                        {Categories.map((c) => (
                                            <option key={c} value={c}>
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                        Frequency
                                    </label>

                                    <select
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-xs outline-none focus:border-black transition-colors"
                                        {...register("frequency", {
                                            required: true,
                                        })}
                                    >
                                        <option value="">Select</option>

                                        {Frequencies.map((f) => (
                                            <option key={f} value={f}>
                                                {f}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>


                            <div className="grid grid-cols-2 gap-3">

                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                        Icon
                                    </label>

                                    <select
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-xs outline-none focus:border-black transition-colors"
                                        {...register("icon", { required: true })}
                                    >
                                        <option value="">Select</option>
                                        <option value="🏃">🏃 Running</option>
                                        <option value="📚">📚 Study</option>
                                        <option value="🧘">🧘 Meditation</option>
                                        <option value="💪">💪 Workout</option>
                                        <option value="💧">💧 Water</option>
                                        <option value="🧠">🧠 Focus</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                        Color
                                    </label>

                                    <select
                                        className="w-full h-9 px-3 rounded-md border border-gray-200 text-xs outline-none focus:border-black transition-colors"
                                        {...register("color", { required: true })}
                                    >
                                        <option value="">Select</option>
                                        <option value="#f5f5f5">Light</option>
                                        <option value="#e5e5e5">Gray</option>
                                        <option value="#d4d4d4">Soft Gray</option>
                                        <option value="#000000">Black</option>
                                    </select>
                                </div>

                            </div>


                            <div>
                                <div className="flex items-center justify-between mb-1.5">

                                    <label className="text-[11px] font-medium text-gray-700">
                                        Target Days
                                    </label>

                                    <span className="text-[11px] text-gray-500">
                                        {watch("targetdaysperweek") || 3}/7
                                    </span>

                                </div>

                                <input
                                    type="range"
                                    min="1"
                                    max="7"
                                    className="w-full accent-black"
                                    {...register("targetdaysperweek", {
                                        valueAsNumber: true,
                                    })}
                                />
                            </div>


                            <div>
                                <label className="block text-[11px] font-medium text-gray-700 mb-1.5">
                                    Description
                                </label>

                                <textarea
                                    rows={3}
                                    placeholder="Add notes..."
                                    className="w-full px-3 py-2 rounded-md border border-gray-200 text-xs outline-none resize-none focus:border-black transition-colors"
                                    {...register("description")}
                                />
                            </div>


                            <div className="flex justify-end gap-2 pt-1">

                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-3 py-2 text-[11px] font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-3 py-2 text-[11px] font-medium bg-black text-white rounded-md hover:opacity-90 transition-opacity"
                                >
                                    {editingHabit ? "Edit Habit" : "Create Habit"}
                                </button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Habits;