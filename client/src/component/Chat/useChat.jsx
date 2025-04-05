import { createContext, useContext, useState } from "react";
import { CloseSocket } from "../../socket/socketfunction";

const chatContext = createContext();

export function ChatProvider({children}) {
    const [socket, setSocket] = useState(null);
    const [chatTarget, setChatTarget] = useState(null);
    const [chatList, setChatList] = useState(new Set());
    const [chatHistory, setChatHistory] = useState(new Map());

    const InitializeSocket = (connection) => {
        setSocket(connection);
    }

    const ChangeTarget = (friend) => {
        setChatTarget(friend);
        setChatList(prevList => new Set(prevList).add(friend));
    }

    const AddHistory = (message, friendName) => {
        setChatHistory(prevHistory => {
            const newHistory = new Map(prevHistory);
            const targetHistory = newHistory.get(friendName) || [];
            newHistory.set(friendName, [message, ...targetHistory]);
            return newHistory;
        });
    }

    const CloseChat = () => {
        setChatTarget(null);
        setChatList(new Set());
        setChatHistory(new Map());
        CloseSocket(socket);
        setSocket(null);
    }

    return (
        <chatContext.Provider value={{socket, InitializeSocket, chatTarget, ChangeTarget, chatList, chatHistory, AddHistory, CloseChat}}>
            {children}
        </chatContext.Provider>
    )
}

export function useChat() {
    return useContext(chatContext);
}