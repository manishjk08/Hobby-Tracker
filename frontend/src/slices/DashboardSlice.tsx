import type { Dashboard } from "../types/type"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

import api from "../services/api"
interface DashboardState{
     dashboard:Dashboard|null
     loading:boolean,
     error:string|null,
}
const initialState:DashboardState={
     dashboard:null,
     loading:true,
     error:null,
}

export const fetchDashboard = createAsyncThunk(
  "dashboard/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/log/dashboard");
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Dashboard fetch failed"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboard = action.payload;
      })
      .addCase(fetchDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dashboardSlice.reducer;