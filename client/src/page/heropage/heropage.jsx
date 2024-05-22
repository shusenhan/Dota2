import './heropage.css'
import HeroInfo from '../../component/HeroInfo';
import SkillPanel from '../../component/Skill/SkillPanel';
import { Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const HeroPage = ({}) => {
    let [searchParams] = useSearchParams();  
    let heroName = searchParams.get('heroName'); 
    const [heroData, setHeroData] = useState(null);
    
    const GetHeroData = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/hero/gethero/${heroName}`, 
            { 
                method: "GET",
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setHeroData(result.data);
        }
    }

    useEffect(() => {
        GetHeroData()
    }, [])

    return(
        <div className="HeroPageContent">
            <div className='HeroPageBox4'>
                <div style={{
                    display:'flex',
                    margin: '5px 40px',
                    fontSize: '14px'
                }}>
                    <Typography sx={{
                        color: '#1A9CF9',
                        fontSize: '14px',
                        whiteSpace: 'pre'
                    }}>英雄 </Typography>
                    /
                    <Typography sx={{
                        color: '#1A9CF9',
                        fontSize: '14px',
                        whiteSpace: 'pre'
                    }}> {heroData ? heroData.HeroCNName: '英雄名'}</Typography>
                </div>
                
                <div style={{
                    display:'flex',
                    margin: '5px 40px'
                }}>
                    <Typography sx={{
                        fontSize: '40px',
                    }}>{heroData ? heroData.HeroCNName: '英雄名'}</Typography>
                </div>

                <div style={{
                    margin: '5px 40px',
                    textAlign: 'left'
                }}>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                </div>

                <div>
                    <div className='HeroPageBox2'>
                        <div className='HeroPageBox3'>
                            {heroData && <HeroInfo hero={heroData}/>}
                        </div>
                    </div>

                    <div>
                        {heroData && <SkillPanel hero={heroData}/>}
                    </div>
                </div>    
            </div>
        </div>
    )
}

export default HeroPage;