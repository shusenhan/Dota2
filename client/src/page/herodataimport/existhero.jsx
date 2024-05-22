import { useEffect, useState } from 'react';
import './existhero.css';
import ExistedHeroCell from './existherocell';
import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ExistedHero = () => {
    const [heroList, setHeroList] = useState(null);
    const navigate = useNavigate();

    const GetExistedHero = async() => {
        const serverResponse = await fetch(
            'http://localhost:3001/hero/getallheroname',
            {
                method: 'GET'
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setHeroList(result);
        }
    }

    useEffect(() => {
        GetExistedHero();
    }, [])

    return(
        <div className='ExistedHeroBox1'>
            <div className='ExistedHeroBox2'>
                <div>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 700,
                        margin: '10px 10px'
                    }}>
                        已录入英雄
                    </Typography>
                    <div style={{display: 'flex'}}>
                        <Button 
                            onClick={() => navigate('/importhero')}
                            sx={{
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                color: 'rgba(0, 0, 0, 0.85)',
                                '&:hover' : {
                                    backgroundColor: 'rgba(0, 255, 55, 0.5)',
                                }
                        }}>
                            <Typography sx={{
                                fontSize: '14px',
                            }}>
                                录入新英雄
                            </Typography>
                        </Button>
                    </div>
                </div>

                <div style={{
                    height: '60px', 
                    borderBottom: '10px solid #B9500B', 
                    margin: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{flexShrink: 0}} src="http://localhost:3001/assets/commons/Strength_attribute_symbol.webp" alt="Strength Hero"/>力量英雄
                </div>
                <div className='ExistedHeroBox3'>
                    {heroList && (heroList.map((hero, index) => (
                        hero.HeroType === 0 && <ExistedHeroCell key={index} engName={hero.HeroName} cnName={hero.HeroCNName}/>
                    )))}
                </div>

                <div style={{
                    height: '60px', 
                    borderBottom: '10px solid #167C13', 
                    margin: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{flexShrink: 0}} src="http://localhost:3001/assets/commons/Agility_attribute_symbol.webp" alt="Agility Hero"/>敏捷英雄
                </div>
                <div className='ExistedHeroBox3'>
                    {heroList && (heroList.map((hero, index) => (
                        hero.HeroType === 1 && <ExistedHeroCell key={index} engName={hero.HeroName} cnName={hero.HeroCNName}/>
                    )))}
                </div>

                <div style={{
                    height: '60px', 
                    borderBottom: '10px solid #257DAE', 
                    margin: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{flexShrink: 0}} src="http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp" alt="Intelligence Hero"/>智力英雄
                </div>
                <div className='ExistedHeroBox3'>
                    {heroList && (heroList.map((hero, index) => (
                        hero.HeroType === 2 && <ExistedHeroCell key={index} engName={hero.HeroName} cnName={hero.HeroCNName} />
                    )))}
                </div>

                <div style={{
                    height: '60px', 
                    borderBottom: '10px solid #5D3FD3', 
                    margin: '5px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{flexShrink: 0}} src="http://localhost:3001/assets/commons/Universal_attribute_symbol.webp" alt="Universal Hero"/>全才英雄
                </div>
                <div className='ExistedHeroBox3'>
                    {heroList && (heroList.map((hero, index) => (
                        hero.HeroType === 3 && <ExistedHeroCell key={index} engName={hero.HeroName} cnName={hero.HeroCNName}/>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default ExistedHero;