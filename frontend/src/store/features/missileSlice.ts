
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Missile {
  id: string;
  name: string;
  speed: number;
  description: string;
}

interface MissileState {
  missiles: Missile[];
}

const initialState: MissileState = {
  missiles: [],
};

const missileSlice = createSlice({
  name: 'missile',
  initialState,
  reducers: {
    setMissiles(state, action: PayloadAction<Missile[]>) {
      state.missiles = action.payload;
    },
  },
});

export const { setMissiles } = missileSlice.actions;



export default missileSlice.reducer;