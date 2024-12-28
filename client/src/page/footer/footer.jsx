import { useState } from 'react';
import './footer.css';
import ChatComponent from './chatcomponent';
import { useChat } from '../../component/Chat/useChat';
import { SendMessage } from '../../socket/socketfunction';
import { useSelector } from 'react-redux';

const Footer = () => {
    const [openChat, setOpenChat] = useState(false);
    const {chatTarget, AddHistory, socket} = useChat();
    const [message, setMessage] = useState('');
    const user = useSelector((state) => state.user);

    const HandleSendMessage  = () => {
        if(message.trim() && socket){
            SendMessage(socket, message, chatTarget, user.UserName);
            setMessage('');
            AddHistory({Message: user.UserName + ": " + message, Me: true}, chatTarget);
        }
    }

    return(
        <div className="FooterContent">
            <div className='UserBoxGroup'>
                组队
            </div>
            <button className="BeginDOTA">开始DOTA</button>
            <div className="HomePageChatBox">
                <ChatComponent 
                    setOpenChat={setOpenChat}
                    style={{
                        height: openChat ? '26vh': '0',
                        opacity: openChat ? '1' : '0',
                        transition: 'height 0.3s ease-in-out, opacity 0.3s ease-in-out'
                }}/>

                <div className="HomePageChatBar" onClick={() => setOpenChat(true)}>
                    <div style={{
                        flexBasis: '22%',
                        color: 'rgb(117, 180, 188)',
                        fontSize: '1.4vh',
                        display: 'block',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'start',
                        whiteSpace: 'nowrap',
                        maxWidth: '22%'
                    }}>
                        对({chatTarget === null ? '自己' : chatTarget})说:
                    </div>

                    <input 
                        type="text" 
                        className="HomePageChatInput" 
                        placeholder="在此处输入聊天内容"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        onKeyDown={(event) => {
                            if(event.key === 'Enter'){
                                HandleSendMessage();
                            }
                        }}    
                    />

                    <div style={{
                        flexBasis: '8%',
                    }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;