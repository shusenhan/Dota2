import './chatcomponent.css'
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import ChatCell from './chatcell';
import { useChat } from '../../component/Chat/useChat';

const ChatComponent = ({setOpenChat, style}) => {
    const {chatList, chatTarget, ChangeTarget} = useChat();

    return(
        <div className="ChatComponentContent" style={style}>
                <div className="ChatComponentMainPart">
                    <div className="ChatComponentLeftPart">
                        <div className='ChatComponentLeftTop'>
                            {chatList && [...chatList].map((item, index) => 
                                <div 
                                    key={index} 
                                    className='ChatCellTitle'
                                    onClick={() => ChangeTarget(item)} 
                                    style={{
                                        backgroundColor: chatTarget === item ? 'rgb(31, 36, 38)' : 'transparent',
                                        cursor: 'pointer'
                                }}>
                                    {item}
                                </div>
                            )}
                        </div>
                        <div className='ChatComponentLeftMain'>
                            <ChatCell/>
                        </div>
                    </div>
                        
                    <div className="ChatComponentRightPart">
                        <div className='ChatComponentRightTop'>
                            <div className='AddNewChannelButton'>
                                频道 <AddIcon sx={{height: '100%'}}/>
                            </div>
                            <Box 
                                className='CloseChatBoxButton' 
                                onClick={() => setOpenChat(false)}
                            >
                                <CloseIcon sx={{height: '100%', color:'rgb(100,100,100)'}}/>
                            </Box>
                        </div>
                        <div className='ChatComponentRightMain'>

                        </div>
                    </div>
                </div>
        </div>
    )
}

export default ChatComponent;