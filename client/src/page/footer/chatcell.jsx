import './chatcell.css';
import { useEffect, useRef, useState } from 'react';
import { ReceiveMessage } from '../../socket/socketfunction';
import { useChat } from '../../component/Chat/useChat';

const ChatCell = () => {
    const {chatHistory, chatTarget, socket, AddHistory} = useChat();

    useEffect(() => {
        if(socket){
            ReceiveMessage(socket, AddHistory)

            return () => {
                socket.off('friend:sendMessage');
            }
        }
    }, [socket])

    return(
        <div className='ChatCellContent'>
            {chatHistory.get(chatTarget) && chatHistory.get(chatTarget).map((message, index) => 
                <div key={index}>
                    {message.Me ? 
                        <div className='ChatCellMyMessage'>{message.Message}</div> : 
                        <div className='ChatCellMyMessage'>{message.Message}</div>
                    }
                </div>
            )}
        </div>
    )
}

export default ChatCell;