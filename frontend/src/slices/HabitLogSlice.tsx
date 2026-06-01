import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";
import type {  Dashboard, HabitLogStateItem } from "../types/type";


interface HabitLogState {
    habitLog: HabitLogStateItem[]
    loading: boolean
    error: string | null
   
}
const initialState: HabitLogState = {
    habitLog: [],
    loading: false,
    error: null
}
export const markComplete = createAsyncThunk(
    'log/markComplete',
    async (data: { id: number }, { rejectWithValue }) => {
        try {
            const response = await api.post('/log/', { habit_id: data.id });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Habit Creation failed');
        }
    })
    export const getStreak = createAsyncThunk(
    'log/getStats',
    async ( habit_id: number , { rejectWithValue }) => {
        try {
            const response = await api.get(`/log/streaks/${habit_id}`, );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Habit Creation failed');
        }
    })

export const unMark = createAsyncThunk(
    'log/del',
    async (data: { id: number }, { rejectWithValue }) => {
        try {
            const response = await api.delete('/log/', { data: { habit_id: data.id } });
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.error || 'Habit Creation failed');
        }
    })
    


const habitLogSlice = createSlice({
    name: "habitLog",
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //Mark complete
            .addCase(markComplete.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(markComplete.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(markComplete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Unmark complete
            .addCase(unMark.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(unMark.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(unMark.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            //getStreak
            .addCase(getStreak.pending,(state)=>{
                state.loading=true;
                state.error=null
            })
            .addCase(getStreak.fulfilled,(state,action)=>{
                state.loading=false;
                const{habit_id,streak}=action.payload
                const existing=state.habitLog.find(item=>item.habit_id===habit_id)
                if(existing){
                    existing.streak=streak
                }else{
                    state.habitLog.push({habit_id,streak})
                }
                state.error=null;
            })
            .addCase(getStreak.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload as string
            })
            


    }
})

export const { clearError } = habitLogSlice.actions
export default habitLogSlice.reducer