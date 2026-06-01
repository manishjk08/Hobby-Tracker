import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/AuthSlice'
import habitReducer from '../slices/HabitSlice'
import habitLogReducer from '../slices/HabitLogSlice'
import dashboardReducer from '../slices/DashboardSlice'
export const store = configureStore({
 reducer:{
    auth:authReducer,
    habit:habitReducer,
    habitLog:habitLogReducer,
    DashBoard:dashboardReducer,
}

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
