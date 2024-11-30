import './personalcenter.css';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import notify from '../../component/ToastBox.tsx';

const PersonalCenter = () => {
    let [searchParams] = useSearchParams();  
    let userName = searchParams.get('username');
    const [otherUser, setOtherUser] = useState(null);
    const [heroPageType, setHeroPageType] = useState('主页');
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const [friendShipState, setFriendShipState] = useState(null);

    const handleSearch = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/searchuser/${userName}`,
            {
                method: 'GET',
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            setOtherUser(result.data[0]);
        }
    }

    const SetFriendShip = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/setfriendship/${user.UserName}/${otherUser.UserName}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user1: user.UserName,
                    user2: otherUser.UserName
                })
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            notify('success', result.message);
            getFriendShipState();
        }
        else{
            notify('error', result.message);
        }
    }

    const ConfirmFriendShip = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/confirmfriendship/${user.UserName}/${otherUser.UserName}`,
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user1: otherUser.UserName,
                    user2: user.UserName
                })
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            notify('success', result.message);
            getFriendShipState();
        }
        else{
            notify('error', result.message);
        }
    }

    const DeleteFriendShip = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/deletefriendship`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user1: user.UserName,
                    user2: otherUser.UserName
                })
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            notify('success', result.message);
            getFriendShipState();
        }
        else{
            notify('error', result.message);
        }
    }

    const getFriendShipState = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/isfriend/${user.UserName}/${otherUser.UserName}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token,
                }
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            setFriendShipState(result.data.data);
        }
        else{
            notify('error', result.message);
        }
    }

    useEffect(() => {
        if(userName){
            handleSearch();
        }
    }, [userName]);

    useEffect(() => {
        if(otherUser && user){
            getFriendShipState();
        }
    }, [otherUser]);

    return (
        <div className='PersonalCenterContent'>
            <div className='PersonalCenterNavbar'>
                <Box 
                    onClick={() => setHeroPageType('主页')} 
                    sx={{
                        position: 'absolute',
                        left: '21.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '主页' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    主页
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '26.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('帖子')} 
                    sx={{
                        position: 'absolute',
                        left: '26.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '帖子' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    帖子
                </Box>
            </div>

            <div className='PersonalCenterData'>
                <div className='PersonalCenterFirstRow'>
                    <div className='PersonalCenterUserIcon'>
                        <img src='http://localhost:3001/assets/commons/user_icon.jpg' alt='usericon'/>
                    </div>

                    {!otherUser && (user ? <div className='PersonalCenterBasicInfo'>
                        <div className='PersonalCenterCommunityLevel'>
                            <div className='PersonalCenterCommunityLevelIcon'>
                                <img src='http://localhost:3001/assets/rank/SeasonalRank0-0.webp' alt='communitylevel'/>
                            </div>
                        </div>

                        <div className='PersonalCenterNameAndID'>
                            <div className='PersonalCenterName'>
                                Malakanata Sublahamatina
                            </div>
                            <div className='PersonalCenterID'>
                                <div className='PersonalCenterLoginState'>
                                    在线
                                </div>
                                <div className='PersonalCenterIDNumber'>
                                    ID: 123456789
                                </div>
                            </div>
                        </div>

                        {user && !otherUser && <div className='PersonalCenterEditInfo'>
                            <Button
                                onClick={() => {}} 
                                sx={{
                                    color: 'rgb(225, 225, 225)',
                                    fontSize: '1.75vh',
                                    width: '30%',
                                    height: '70%',
                                    border: 'none',
                                    borderRadius: '0px',
                                    backgroundColor: 'rgba(80,90, 90, 1)',
                                    '&:hover': {
                                        pointer: 'cursor',
                                        backgroundColor: 'rgba(100, 120, 120, 1)',
                                    }
                            }}>
                                编辑个人资料
                            </Button>
                        </div>}
                    </div> : <div>登录</div>)}

                    {otherUser && <div className='PersonalCenterBasicInfo'>
                        <div className='PersonalCenterCommunityLevel'>
                            <div className='PersonalCenterCommunityLevelIcon'>
                                <img src='http://localhost:3001/assets/rank/SeasonalRank0-0.webp' alt='communitylevel'/>
                            </div>
                        </div>

                        <div className='PersonalCenterNameAndID'>
                            <div className='PersonalCenterName'>
                                {otherUser.UserName}
                            </div>
                            <div className='PersonalCenterID'>
                                <div className='PersonalCenterIDNumber'>
                                    ID: {otherUser.UserId}
                                </div>
                            </div>
                        </div>

                        {user && otherUser && <div className='PersonalCenterAddFriend'>
                            {!friendShipState && 
                                <Button
                                    onClick={SetFriendShip} 
                                    sx={{
                                        color: 'rgb(225, 225, 225)',
                                        fontSize: '1.75vh',
                                        width: '30%',
                                        height: '70%',
                                        border: 'none',
                                        borderRadius: '0px',
                                        backgroundColor: 'rgba(0, 200, 0, 0.5)',
                                        '&:hover': {
                                            pointer: 'cursor',
                                            background: 'rgba(0, 200, 0, 0.75)',
                                        }
                                }}>
                                    申请添加好友
                                </Button>
                            }

                            {friendShipState && friendShipState.State === 0 && friendShipState.User1 === user.UserName && 
                                <Box 
                                    sx={{
                                        color: 'rgb(225, 225, 225)',
                                        fontSize: '1.75vh',
                                        width: '30%',
                                        height: '70%',
                                        border: 'none',
                                        borderRadius: '0px',
                                        backgroundColor: 'rgba(255, 255, 0, 0.5)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                }}>
                                    等待对方同意中
                                </Box>
                            }

                            {friendShipState && friendShipState.State === 0 && friendShipState.User2 === user.UserName && 
                                <Button
                                    onClick={ConfirmFriendShip}
                                    sx={{
                                        color: 'rgb(225, 225, 225)',
                                        fontSize: '1.75vh',
                                        width: '30%',
                                        height: '70%',
                                        border: 'none',
                                        borderRadius: '0px',
                                        backgroundColor: 'rgba(255, 165, 0, 0.5)',
                                        '&:hover': {
                                            pointer: 'cursor',
                                            background: 'rgba(255, 165, 0, 0.75)',
                                        }
                                }}>
                                    同意添加为好友
                                </Button>
                            }

                            {friendShipState && friendShipState.State === 1 && 
                                <Button
                                    onClick={DeleteFriendShip} 
                                    sx={{
                                        color: 'rgb(225, 225, 225)',
                                        fontSize: '1.75vh',
                                        width: '30%',
                                        height: '70%',
                                        border: 'none',
                                        borderRadius: '0px',
                                        backgroundColor: 'rgba(200, 0, 0, 0.5)',
                                        '&:hover': {
                                            pointer: 'cursor',
                                            background: 'rgba(200, 0, 0, 0.75)',
                                        }
                                }}>
                                    删除好友
                                </Button>
                            }
                        </div>}
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PersonalCenter;