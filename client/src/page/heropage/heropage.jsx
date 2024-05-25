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
    
    // const GetHeroData = async () => {
    //     const serverResponse = await fetch(
    //         `http://localhost:3001/hero/gethero/${heroName}`, 
    //         { 
    //             method: "GET",
    //         }
    //     )

    //     const result = await serverResponse.json();

    //     if(serverResponse.status === 200){
    //         setHeroData(result.data);
    //     }
    // }

    // useEffect(() => {
    //     GetHeroData()
    // }, [])

    return(
        <div className="HeroPageContent">
            <div className='HeroPageLeft'>
                <div className='HeroPageHeroName'
                    style={{
                        height: '15%',
                        fontSize: '5vh',
                        display: 'flex',
                }}>
                    大地之灵
                </div>
                <div style={{
                    height: '10%',
                    fontSize: '100%'
                }}>
                    一行
                </div>
                <div style={{
                    height: '15%',
                    fontSize: '100%'
                }}>
                    一行
                </div>
                <div style={{
                    height: '15%',
                    fontSize: '100%'
                }}>
                    一行
                </div>
                <div style={{
                    height: '45%',
                    fontSize: '100%'
                }}>
                    一行
                </div>
            </div>
            <div className='HeroPageMiddle'>
               
            </div>
            <div className='HeroPageRight'>
                
            </div>
        </div>
    )
}

export default HeroPage;