import { useDispatch, useSelector } from "react-redux";
import { useChat } from "./Chat/useChat";
import { useEffect } from "react";
import { userlogin } from "../state/state";
import { SocketInitialize } from "../socket/socketfunction";
import notify from "./ToastBox.tsx";

const AutoLogin = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const {InitializeSocket, socket} = useChat();

    const AutoLogin = async () => {
        const response = await fetch(
            'http://localhost:3001/auth/autoLogin',
            {
                method: "POST",
                credentials: 'include'
            }
        )
    
        const result = await response.json();
    
        if(response.status === 200){
          notify('success', '登录成功');
          dispatch(userlogin({
              user: result.data, 
              token: result.token
          }));
        }
    }
    
    useEffect(() => {
        AutoLogin();
    }, []);

    useEffect(() => {
        if(user){
            const connection = SocketInitialize(user.UserName);
            InitializeSocket(connection);
        }
    }, [user])
}

export default AutoLogin;