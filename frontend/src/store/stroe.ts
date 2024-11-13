import { configureStore } from '@reduxjs/toolkit'
import missileReducer from '../store/features/missileSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
    reducer:{
        user: userReducer,
        missile:missileReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;