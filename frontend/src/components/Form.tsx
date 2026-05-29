import { useForm, type SubmitHandler } from "react-hook-form";
import type { Habit, HabitUpdateInput } from "../types/type";
import { useAppDispatch } from "../app/hook";
import { useEffect } from "react";
import { EditHabit, createHabit, getActiveHabit } from "../slices/HabitSlice";
import { Frequencies, Categories } from "../types/type";

type FormProps = {
  onClose: () => void;
  editingHabit: Habit | null;
};

const Form = ({ onClose, editingHabit }: FormProps) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, reset, watch } = useForm<HabitUpdateInput>();

    useEffect(() => {
        if (editingHabit) {
            reset({
                title: editingHabit.title,
                category: editingHabit.category,
                description: editingHabit.description,
                icon: editingHabit.icon,
                color: editingHabit.color,
                frequency: editingHabit.frequency,
                targetdaysperweek: editingHabit.targetdaysperweek,
            });
            return;
        }

        reset();
    }, [editingHabit, reset]);

    const onSubmit: SubmitHandler<HabitUpdateInput> = async (data) => {
        if (editingHabit) {
            await dispatch(EditHabit({ ...data, id: editingHabit.id })).unwrap();
        } else {
            await dispatch(createHabit(data)).unwrap();
        }

        reset();
        onClose();
        dispatch(getActiveHabit());
    };

    

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">

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
                        onClick={onClose}
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



    );
};

export default Form;
