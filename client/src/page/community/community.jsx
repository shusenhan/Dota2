import './community.css';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import CommunityCell from './communitycell';

const CommunityMianPage = () => {
    const [heroPageType, setHeroPageType] = useState('英雄');
    const [classification, setClassification] = useState('');
    const [visableCommunities, setVisableCommunities] = useState([]);

    const GetVisableCommunities = async () => {
        const response = await fetch(
            'http://localhost:3001/community/visableCommunities',
            {
                method: 'GET'
            }
        );

        const result = await response.json();

        if(response.status === 200){
            setVisableCommunities(result.data);
        }
    };

    useEffect(() => {
        GetVisableCommunities();
    }, [])

    return(
        <div className="CommunityMianPageContent">
            <div className='CommunityMianPageNavbar'>
                <Box 
                    onClick={() => setHeroPageType('英雄')} 
                    sx={{
                        position: 'absolute',
                        left: '21.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '英雄' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    英雄
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
                    onClick={() => setHeroPageType('走势')} 
                    sx={{
                        position: 'absolute',
                        left: '31.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '走势' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    走势
                </Box>
            </div>

            <div className='CommunityMianPagePostPart'>
                <div className='CommunityMianPageLeftPart'>
                    <div className='CommunityMianPageLeftPartTitle'>
                        <div className='CommunityMianPageLeftPartTitleName'>
                            社区
                        </div>
                        <div className='CommunityMianPageLeftPartTitleClassification'>
                            分类：
                            <select
                                onChange={(e) => setClassification(e.target.value)}
                                style={{
                                    width: '48%',
                                    height: '70%',
                                    backgroundColor: 'rgb(40, 40, 40)',
                                    marginLeft: '2%',
                                    color: 'rgb(160, 160, 160)',
                                    fontSize: '1.75vh'
                            }}>  
                                <option value="属性">活跃度</option> 
                            </select>
                        </div>
                    </div>
                    <div className='CommunityMianPageLeftPartCommunities'>
                        {visableCommunities && visableCommunities.map((item, index) => 
                            <CommunityCell 
                                key={index} 
                                community={item} />
                        )}
                    </div>
                </div>
                <div className='CommunityMianPageRightPart'>

                </div>
            </div>
        </div>
    )
};

export default CommunityMianPage;