import './setting.css';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useSetting } from './useSetting';
import themes from '../../theme/themes';


const SettingPanel = ({setOpenSetting}) =>{
    const [heroPageType, setHeroPageType] = useState('');
    const {currentTheme, ChangeTheme} = useSetting();
    const [openPanel, setOpenPanel] = useState('');

    return(
        <div className='SettingContent'>
            <div className='SettingPanelNavbar'>
                <Box 
                    onClick={() => setOpenSetting(false)}
                    sx={{
                        position: 'absolute',
                        left: '0.5%',
                        height: '100%',
                        color: 'rgb(255, 255, 255)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    <img src="http://localhost:3001/assets/commons/setting.png" 
                        alt="Setting" 
                        height="70%"
                        style={{
                            filter: 'invert(80%)'
                        }}
                    />
                </Box>

                <Box 
                    onClick={() => setHeroPageType('选项')} 
                    sx={{
                        position: 'absolute',
                        left: '4%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '选项' ? 'rgb(255, 255, 255)' : 'rgb(121, 121, 121)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    选项
                </Box>

                {/* <Box style={{
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
                    onClick={() => setHeroPageType('攻略')} 
                    sx={{
                        position: 'absolute',
                        left: '26.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '攻略' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    攻略
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '31.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('数据')} 
                    sx={{
                        position: 'absolute',
                        left: '31.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '数据' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    数据
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '36.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('改动')} 
                    sx={{
                        position: 'absolute',
                        left: '36.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '改动' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    改动
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '41.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('介绍')} 
                    sx={{
                        position: 'absolute',
                        left: '41.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '介绍' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    介绍
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '46.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('社区')} 
                    sx={{
                        position: 'absolute',
                        left: '46.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '社区' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    社区
                </Box> */}
            </div>
            <div className='SettingPanelMenu'>
                <div className='SettingPanelMenuLeft'>
                    <div className='SettingPanelPartTitle'>
                        界面
                    </div>
                    <div style={{
                        height: '1px',
                        width: '100%',
                        backgroundColor: 'rgb(86, 86, 86)',
                    }}/>

                    <div className='SettingPanelSelection' style={{color: 'white'}}>
                        主题：
                    </div>
                    <div className='SettingPanelSelection'>
                        <div 
                            onMouseEnter={() => setOpenPanel('theme')}
                            onMouseLeave={() => setOpenPanel('')}
                            style={{
                                height: '4.25vh',
                                width: '70%',
                                backgroundColor: 'rgb(44, 46, 51)',
                                border: '2px solid rgb(86, 86, 86)',
                                color: 'white',
                                fontSize: '2vh',
                                borderRadius: '0',
                                display: 'flex',
                                alignItems: 'center',
                                position: 'relative'
                        }}>
                            <div style={{
                                padding: '0 4%'
                            }}>
                                {currentTheme.name}
                            </div>
                            <div style={{
                                backgroundColor: 'rgb(44, 46, 51)',
                                border: '2px solid rgb(86, 86, 86)',
                                position: 'absolute',
                                height: openPanel === 'theme' ? '20vh' : '0px',
                                width: 'calc(100% + 4px)',
                                opacity: openPanel === 'theme' ? '1' : '0',
                                top: '100%',
                                left: '-2px',
                                transition: 'height 0.2s, opacity 0.2s',
                                padding: '2% 4%',
                            }}>
                                <div onClick={() => ChangeTheme(themes.theme1)}>
                                    倾天之战
                                </div>
                                <div onClick={() => ChangeTheme(themes.theme2)}>
                                    大展宏图
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='SettingPanelMenuMiddle'>
                    <div className='SettingPanelPartTitle'>
                        聊天
                    </div>
                </div>

                <div className='SettingPanelMenuRight'>
                    <div className='SettingPanelPartTitle'>
                        其他
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingPanel;