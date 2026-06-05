import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";


type AiData={
    totalHabits:number,
    completionRate:number,
    currentStreak:number,
    longestStreak:number,
    bestHabit:string,
    worstHabit:string,
    weeklyCompletions:number[]
}
type AiInsights = {
  summary: string;
  win: string | null;
  warning: string | null;
  tip: string;
}

interface AiState{
    insights:AiInsights|null,
    loading:boolean,
    error:string|null
}

const initialState:AiState={
    insights:null,
    loading:false,
    error:null
}

export const fetchInsights=createAsyncThunk(
    `ai/fetchInsights`,
    async(data:AiData,{rejectWithValue})=>{
        try{
            const response=await api.post(`ai/insights`,data)
            return response.data.data
        }catch(error:any){
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch insights');
        }
    }
)
const aiSlice=createSlice({
    name:"ai",
    initialState,
    reducers:{
        clearInsights: (state) => {  
      state.insights = null;
      state.error = null;
    }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchInsights.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });
        builder.addCase(fetchInsights.fulfilled,(state,action)=>{
            state.loading=false;
            state.insights=action.payload;
        });
        builder.addCase(fetchInsights.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        });
    }
});
export default aiSlice.reducer;