import './FriendMenu.css'
import { Box } from '@mui/material';
import { useChat } from '../Chat/useChat';

const FriendMenu = ({friend}) => {
    const {ChangeTarget} = useChat();

    return(
        <div className='FriendMenuContent'>
            <div className='FriendCard'>
                <Box className='UserCardTitleItem'
                    style={{
                        flexBasis: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                    <Box key={friend.UserID} style={{
                        backgroundImage: `url(http://localhost:3001/assets/user/${friend.UserIcon})`,
                        backgroundSize: 'cover',
                        width: '80%',
                        height: '80%',
                        padding: '10%',
                    }}>

                    </Box>
                </Box>
                
                <Box
                    className='UserCardTitleItem' 
                    style={{
                        flexBasis: '60%',
                        maxWidth: '60%',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height:'100%',
                        width: '100%',
                    }}>
                        <div style={{
                            width: '100%',
                            display: 'block',
                            color: 'rgb(210, 210, 210)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            height: '50%'
                        }}>
                            {friend.UserName}
                        </div>
                        <div style={{
                            width: '100%',
                            display: 'block',
                            color: 'rgb(67, 161, 98)',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            height: '50%',
                            fontSize: '12px'
                        }}>
                            {friend ? friend.LoginState : ""}
                        </div>
                    </div>
                </Box>

                <Box className='UserCardTitleItem'
                    sx={{
                        flexBasis: '20%',
                        minWidth: '20%',
                        background: 'radial-gradient(circle at center, gold, rgba(0, 0, 0, 0) 50%)',
                }}>
                    <img src='http://localhost:3001/assets/rank/SeasonalRank0-0.webp' width='100%'/>
                </Box>
            </div>
            <div className='FriendUserSomething'>用户自定义内容</div>
            <div className='FirendMenuOptions'>
                <div className='FriendMenuItem'>查看个人资料</div>
                <div className='FriendMenuItem' onClick={() => ChangeTarget(friend.UserName)}>发送消息</div>
                <div className='FriendMenuItem'>屏蔽用户</div>
                <div className='FriendMenuItem'>举报用户</div>
            </div>
        </div>
    )
}

export default FriendMenu;