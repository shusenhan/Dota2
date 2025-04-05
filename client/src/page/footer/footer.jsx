import { useRef, useState } from 'react';
import './footer.css';
import ChatComponent from './chatcomponent';
import { useChat } from '../../component/Chat/useChat';
import { SendMessage } from '../../socket/socketfunction';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import useOutsideClick from '../../component/useOutsideClick';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { setGame, endGame } from '../../state/state.js'
import { useGame } from '../../component/useGame.jsx';

const Footer = () => {
    const [openChat, setOpenChat] = useState(false);
    const {chatTarget, AddHistory, socket} = useChat();
    const [message, setMessage] = useState('');
    const user = useSelector((state) => state.user);
    const game = useSelector(state => state.game);
    const [selected, setSelected] = useState(null);
    const dispatch = useDispatch();
    const [openGamePanel, setOpenGamePanel] = useState(false);
    const ref = useRef(null);
    useOutsideClick(ref, () => { setOpenGamePanel(false); setSelected(null)});
    const {ShowGame} = useGame()

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

            <div ref={ref}>
                { game === null ? 
                    <button className="BeginDOTA" 
                        onClick={() => { 
                            setOpenGamePanel(true); 
                            if(selected){
                                dispatch(setGame({game: selected}));
                                ShowGame();
                                setOpenGamePanel(false);
                                setSelected(null);
                            }
                    }}>
                        开始DOTA
                    </button> :

                    <button className="EndDOTA" onClick={() => { dispatch(endGame())}}>
                        结束游戏
                    </button>
                }

                <Box 
                    className='BeginGamePanel' 
                    sx={{
                        width: openGamePanel ? '20%' : '0',
                        opacity: openGamePanel ? 1: 0
                }}>
                    <div className='BeginGamePanelLeft'>
                        <div className='BeginGamePanelUp'>
                        </div>
                        <div className='BeginGamePanelDown'>
                            <div className="GameCell"
                                onClick={() => {
                                    setSelected(1);
                                }} 
                                style={{
                                    boxShadow: selected === 1 && '0px 0px 10px 0px #27a3f5',
                                    background: 'url(http://localhost:3001/assets/commons/dota2_logo.png) center/cover'
                            }}>
                                1
                            </div>
                            <div className="GameCell" 
                                style={{
                                    background: 'url(http://localhost:3001/assets/commons/dota2_logo.png) center/cover'
                            }}>
                                2
                            </div>
                            <div className="GameCell" 
                                style={{
                                    background: 'url(http://localhost:3001/assets/commons/dota2_logo.png) center/cover'
                            }}>
                                3
                            </div>
                        </div>
                    </div>

                    <div className='BeginGamePanelRight' onClick={() => {setOpenGamePanel(false); setSelected(null)}}>
                        <PlayArrowIcon/>
                    </div>
                </Box>
            </div>

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