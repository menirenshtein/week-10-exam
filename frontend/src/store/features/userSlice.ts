import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
    username: string;
    organization :string;
    location? :string;
}

const initialState : userState ={
    username: '',
    organization: '',
    location: '',
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        setUser(state, action: PayloadAction<userState>) {
            state.username = action.payload.username;
            state.organization = action.payload.organization;
            state.location = action.payload.location;
        },
        logout(state) {
        state.username = '';
        state.organization = '';
        state.location = '';
        },
        extraReducers (builder){
            builder
        }
    }
})


export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;