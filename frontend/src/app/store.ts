import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice'
import habitReducer from '../slices/HabitSlice'
import habitLogReducer from '../slices/HabitLogSlice'
import dashboardReducer from '../slices/DashboardSlice'
import aiReducer from '../slices/AiSlice'
export const store = configureStore({
 reducer:{
    auth:authReducer,
    habit:habitReducer,
    habitLog:habitLogReducer,
    dashboard:dashboardReducer,
    ai:aiReducer,
}

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
