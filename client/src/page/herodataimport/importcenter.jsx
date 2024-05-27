import './importcenter.css';
import { useDispatch } from 'react-redux';
import { changePage } from '../../state/state';
import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ImportCenter = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(changePage({newPage: '导入'}));
    },[]);

    return(
        <div className='ImportCenterContent'>
            <div className='ImportCenterHero' onClick={() => navigate('\hero')}>
                <div className='ImportCenterText'>
                    {"导入英雄数据".split('').map((char, index) => (
                        <Box key={index}
                            sx={{  
                                margin: '0px'
                        }}>  
                            {char}
                        </Box>
                    ))}
                </div>
            </div>
            <div className='ImportCenterSkill'>
                <div className='ImportCenterText'>
                        {"导入技能数据".split('').map((char, index) => (
                            <Box key={index}
                                sx={{  
                                    margin: '0px'
                            }}>  
                                {char}
                            </Box>
                        ))}
                    </div>
                </div>
            <div className='ImportCenterItem'>
                <div className='ImportCenterText'>
                    {"导入装备数据".split('').map((char, index) => (
                        <Box key={index}
                            sx={{  
                                margin: '0px'
                        }}>  
                            {char}
                        </Box>
                    ))}
                </div>
            </div>
            <div className='ImportCenterHero'>

            </div>


            <div className='ImportCenterHero'>

            </div>
            <div className='ImportCenterHero'>

            </div>
        </div>
    );
};

export default ImportCenter;