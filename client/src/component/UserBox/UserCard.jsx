import './UserCard.css';
import { Box } from '@mui/material';

const UserCard = () => {
    return(
        <div className="UserCardContent">
            <div className='UserCardTitle'>
                <Box className='UserCardTitleItem'
                    style={{
                        flexBasis: '20%',
                        minWidth: '20%',
                }}>
                    <img src='http://localhost:3001/assets/commons/user_icon.jpg' width='100%'
                        style={{
                            padding: '10%',
                    }}/>
                </Box>
                
                <Box className='UserCardTitleItem' 
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
                            MalakanataSublahamatina
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
                            主菜单
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

            <div className='UserSomething'>
                用户自定义内容
            </div>
        </div>
    )
}

export default UserCard;