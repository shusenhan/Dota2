import './heropage.css'
import HeroInfo from '../../component/HeroInfo';
import SkillPanel from '../../component/Skill/SkillPanel';
import { Typography } from '@mui/material';

const HeroPage = ({}) => {
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
                    }}> {'术士'}</Typography>
                </div>
                
                <div style={{
                    display:'flex',
                    margin: '5px 40px'
                }}>
                    <Typography sx={{
                        fontSize: '40px',
                    }}>术士</Typography>
                </div>

                <div style={{
                    margin: '5px 40px',
                    textAlign: 'left'
                }}>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                    <img src='http://localhost:3001/assets/commons/Filter_support_icon.webp'/>
                </div>
                    
                <div className='HeroPageBox2'>
                    <div className='HeroPageBox3'>
                        <HeroInfo/>
                    </div>
                </div>

                <div>
                    <SkillPanel/>
                </div>
            </div>
        </div>
    )
}

export default HeroPage;