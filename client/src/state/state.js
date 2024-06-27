import { createSlice } from '@reduxjs/toolkit'

const initState = {
    user: null,
    token: '',
    selectedPage: 'home',
};

const globalState = createSlice({
    name: 'globalState',
    reducers: {
        changePage(state, action){
            state.selectedPage = action.payload.newPage;
        },
        logout(state){
            state.user = null;
            state.token = '';
        }
    },
});

export const { changePage, logout } = globalState.actions;
export default globalState.reducer;