import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import type { Habit, HabitInput, HabitUpdateInput } from "../types/type";

interface HabitState {
    habits: Habit[]
    loading: boolean
    error: string | null
}
const initialState: HabitState = {
    habits: [],
    loading: true,
    error: null
}
export const createHabit = createAsyncThunk(
    'habit/create',
    async (data: HabitInput, { rejectWithValue }) => {
        try {
            const response = await api.post('/habit/create', data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Habit Creation failed');
        }
    })
export const getHabit = createAsyncThunk(
    'habit/get',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/habit/get');
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Fetching habit failed');
        }
    })
export const EditHabit = createAsyncThunk(
    'habit/update',
    async (  data:HabitUpdateInput, { rejectWithValue }) => {
        try {
            const response = await api.put(`/habit/update/${data.id}`, data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Habit Update failed');
        }
    })
export const delHabit = createAsyncThunk(
    'habit/delete',
    async (data: { id: number }, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/habit/delete/${data.id}`);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Delete habit failed');
        }
    })
 export const getArchiveHabit=createAsyncThunk(
    'habit/archive',
    async(_,{rejectWithValue})=>{
        try {
            const response=await api.get(`/habit/archive`)
            return response.data.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.error || 'archive habit failed to fetch')
        }
    }
 )  
 export const getActiveHabit=createAsyncThunk(
    'habit/active',
    async(_,{rejectWithValue})=>{
        try {
            const response=await api.get(`/habit/active`)
            return response.data.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.error || 'Active habit failed to fetch')
        }
    }
 ) 
 export const archiveHabit=createAsyncThunk(
    'habit/archive',
    async(data:{id:number},{rejectWithValue})=>{
        try {
            const response=await api.post(`/habit/archive/${data.id}`)
            return response.data.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.error || 'archive habit failed')
        }
    }
 )
  export const restoreHabit=createAsyncThunk(
    'habit/restore',
    async(data:{id:number},{rejectWithValue})=>{
        try {
            const response=await api.post(`/habit/restore/${data.id}`)
            return response.data.data
        } catch (error:any) {
            return rejectWithValue(error.response?.data?.error || 'Resrore habit failed')
        }
    }
 ) 
    

const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //CREATE HABIT
            .addCase(createHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createHabit.fulfilled, (state, action) => {
                state.loading = false;
                state.habits.push(action.payload);
            })
            .addCase(createHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //GET ALL HABIT
            .addCase(getHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHabit.fulfilled, (state, action) => {
                state.loading = false;
                state.habits = action.payload;
            })
             .addCase(getHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                
            })
            //GET ACTIVE HABITS
            .addCase(getActiveHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getActiveHabit.fulfilled, (state, action) => {
                state.loading = false;
                state.habits = action.payload;
            })
            .addCase(getActiveHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //getArchiveHabit
            .addCase(getArchiveHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getArchiveHabit.fulfilled, (state, action) => {
                state.loading = false;
                state.habits = action.payload;
            })
            .addCase(getArchiveHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })


            //EDIT 
            .addCase(EditHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(EditHabit.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.habits.findIndex(h => h.id === action.payload.id);
                if (index !== -1) {
                    state.habits[index] = action.payload;
                }
            })
            .addCase(EditHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            //DELETE 
            .addCase(delHabit.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(delHabit.fulfilled, (state, action) => {
                state.loading = false;
                state.habits = state.habits.filter(h => h.id !== action.payload);
            })
            .addCase(delHabit.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});
export const { clearError } = habitSlice.actions;
export default habitSlice.reducer;