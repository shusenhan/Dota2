import './personalcenter.css';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { logout } from '../../state/state';

const PersonalCenter = () => {
    const [heroPageType, setHeroPageType] = useState('主页');
    const user = useSelector(state => state.user);

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

                    {user ? <div className='PersonalCenterBasicInfo'>
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
                    </div> : <div>登录</div>}
                </div>
            </div>
        </div>
    )
}

export default PersonalCenter;