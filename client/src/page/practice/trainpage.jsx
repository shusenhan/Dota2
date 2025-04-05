import './trainpage.css';   
import { Box } from '@mui/material'; 
import { useState } from 'react';
import ItemPage from './itempage/itempage';
import ForNewPage from './fornew/fornewpage';

const TrainPage = () => {
    const [pageType, setPageType] = useState('新手');

    return (
        <div className="TrainPageContent">
            <div className='TrainPageNavbar'>
                <Box 
                    onClick={() => setPageType('新手')} 
                    sx={{
                        position: 'absolute',
                        left: '21.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '新手' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    新手
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
                    onClick={() => setPageType('术语')} 
                    sx={{
                        position: 'absolute',
                        left: '26.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '术语' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    术语
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
                    onClick={() => setPageType('物品')} 
                    sx={{
                        position: 'absolute',
                        left: '31.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '物品' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    物品
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
                    onClick={() => setPageType('更新')} 
                    sx={{
                        position: 'absolute',
                        left: '36.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '更新' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    更新
                </Box>

            </div>

            {pageType === '物品' && <ItemPage/>}
            {pageType === '新手' && <ForNewPage/>}
        </div>
    )
}

export default TrainPage;