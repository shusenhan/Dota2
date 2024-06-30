import { createSlice } from '@reduxjs/toolkit'
import { SocketInitialize } from '../socket/socketfunction';

const initState = {
    user: null,
    token: '',
    selectedPage: 'home',
    socket: null,
    friendList: null,
};

const globalState = createSlice({
    name: 'globalState',
    initialState: initState,
    reducers: {
        changePage(state, action){
            state.selectedPage = action.payload.newPage;
        },
        logout(state){
            state.user = null;
            state.token = '';
            state.selectedPage= 'home';
            // state.socket.disconnect();
            state.socket = null;
            state.friendList = null;
        },
        userlogin(state, action){
            state.user = action.payload.user;
            state.token = action.payload.token;
            SocketInitialize(state.socket);
        },
        setFriendList(state, action){
            state.friendList = action.payload.friendList;
        }
    },
});

export const { changePage, logout, userlogin, setFriendList } = globalState.actions;
export default globalState.reducer;