import { createSlice } from '@reduxjs/toolkit'

const initState = {
    selectedPage: 'home',
};

const globalState = createSlice({
    name: 'globalState',
    reducers: {
        changePage(state, action){
            state.selectedPage = action.payload.newPage;
        }
    },
});

export const { changePage } = globalState.actions;
export default globalState.reducer;