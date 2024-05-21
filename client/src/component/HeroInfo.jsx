import { useState } from 'react';
import Image from './Image';
import { Box, Slider } from '@mui/material';
import Talents from './Talents/Talents';

const HeroInfo = ({}) => {
    const [level, setLevl] = useState(1);

    const ChangeLevel = (event) => {
        setLevl(event.target.value)
    };

    return(
        <div style={{
            display: 'flex'
        }}>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '2px',
                border: '2px solid rgb(0,0,0)',
            }}>
                <div style={{
                    background: 'linear-gradient(0deg, #4A3000, #B9500B)'
                }}>
                    <div>术士</div>
                    <div style={{
                        margin: '5px 0px',
                        position: 'relative'
                    }}>
                        <Image width='220px' height='124px' src='http://localhost:3001/assets/heros/Warlock_icon.webp'/>
                        <Box 
                            sx={{
                                width:'40px', 
                                height:'40px', 
                                position:'absolute', 
                                top:'105px', 
                                left:'-23px',
                                background:'radial-gradient(circle at center, #FFE605, #734B00)',
                                borderRadius:'20px',
                                border: '2px solid #484733',
                                fontSize:'20px',
                                fontWeight: '700',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 9,
                                '&:hover > div': {
                                    display: 'block',
                                }
                        }}>{level}
                            <Box
                                sx={{
                                    display: 'none',
                                    position: 'absolute',
                                    top:'-102px',
                                    left: '3px'
                            }}>
                                <Slider
                                    min={1}
                                    max={30}
                                    orientation="vertical"
                                    valueLabelDisplay="auto"
                                    value={level}
                                    onChange={ChangeLevel}
                                    defaultValue={1}
                                    sx={{
                                        height:'100px',
                                        color: '#C59A01'
                                    }}
                                />
                            </Box>
                        </Box>
                    </div>
                    <div >
                        <img src='http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'/>
                        {/* <img src='http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'/>
                        <img src='http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'/>
                        <img src='http://localhost:3001/assets/commons/Universal_attribute_symbol.webp'/> */}
                    </div>
                </div>

                <div style={{
                    display: 'table',
                    width:'100%',
                }}>
                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #286323, #7AF03C)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            生命值
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {500 + level * 100}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{5.0}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #1056DB, #73F5FE)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            魔法值
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {300}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{2.0}
                        </div>
                    </div>
                </div>
                
                
                <div style={{
                    display: 'table',
                    width:'100%',
                    borderTop: '2px solid black'
                }}>
                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #4A3000, #B9500B)'
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white',
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'/>
                            力量
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {30}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            +{3.0}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #2C4A00, #167C13)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'/>
                            敏捷
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {14}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{2.0}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #00494A, #257DAE)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white',
                            textAlign:'center',
                            justifyContent:'center'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'/>
                            智力
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {14}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{2.0}
                        </div>
                    </div>
                </div>

                <Box sx={{
                    display: 'table',
                    width:'100%',
                    borderTop: '2px solid black',
                    '& > div:nth-child(even)': {
                        backgroundColor: '#CCCCCA'
                    },
                }}>
                    <Box sx={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'30%',
                            color: 'black',
                        }}>
                            护甲
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'70%',
                            color: 'black'
                        }}>
                            {3}
                        </div>
                    </Box>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Magic_Resistance_icon.webp'/>
                            魔抗
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {25}%
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Movement_speed_icon.webp'/>
                            移速
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {300}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Turn_rate_icon.webp'/>
                            转身速率
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {34}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击力
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {30}-{50}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击速度
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {100}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击间隔
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {1.7}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Ranged_icon.webp'/>
                            {/* <Image height='12px' src='http://localhost:3001/assets/commons/Melee_icon.webp'/> */}
                            攻击距离
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {600}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击动画
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {0.45}/{0.25}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            视野
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {1800}<Image height='12px' src='http://localhost:3001/assets/commons/Daytime_icon.webp'/>/
                            {800}<Image height='12px' src='http://localhost:3001/assets/commons/Nighttime_icon.webp'/>
                        </div>
                    </div>
                </Box>
            </div>
            <Talents/>
        </div>
    )
}

export default HeroInfo;