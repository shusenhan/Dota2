import { useEffect, useState } from 'react';
import './existhero.css';
import { useNavigate } from 'react-router-dom';
import HeroTypeCell from '../heropage/TypeCell';
import { Button } from '@mui/material';

const ExistedHero = () => {
    const [heroList, setHeroList] = useState(null);
    const navigate = useNavigate();
    const [strengthHeroList, setStrengthHeroList] = useState([]);
    const [agilityHeroList, setAgilityHeroList] = useState([]);
    const [intelligenceHeroList, setIntelligenceHeroList] = useState([]);
    const [universalHeroList, setSUniversalHeroList] = useState([]);

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

    const ClassifyHeros = () => {
        var strength = [];
        var agility = [];
        var intelligence = [];
        var universal = [];

        for(var i = 0; i < heroList.length; i++){
            switch(heroList[i].HeroType){
                case 0:
                    strength.push([heroList[i].HeroName, heroList[i].HeroCNName]);
                    break;
                case 1:
                    agility.push([heroList[i].HeroName, heroList[i].HeroCNName]);
                    break;
                case 2:
                    intelligence.push([heroList[i].HeroName, heroList[i].HeroCNName]);
                    break;
                case 3:
                    universal.push([heroList[i].HeroName, heroList[i].HeroCNName]);
                    break;
                default:
                    break;
            }
        }

        setStrengthHeroList(strength);
        setAgilityHeroList(agility);
        setIntelligenceHeroList(intelligence);
        setSUniversalHeroList(universal);
    };

    useEffect(() => {
        GetExistedHero();

    }, []);

    useEffect(() => {
        if(heroList !== null){
            ClassifyHeros();
        }
    }, [heroList])

    return(
        <div className='ExistedHeroContent'>
            <div className='ExistedHeroTitle'>
                已有英雄
                <div className='ExistedHeroImportButton'>
                    <Button onClick={() => navigate('\import')} 
                        sx={{
                            color:'rgb(161, 161, 161)',
                            '&:hover': {
                                color: 'rgb(210, 210, 210)',
                            }
                    }}>
                    导入新英雄</Button>
                </div>
            </div>
            <div className='ExistedHeroContainer'>
                {heroList &&
                <div className='ExistedHeros'>
                    <HeroTypeCell heroList={strengthHeroList} type='Strength' cnType='力量' importing={true}/>
                    <HeroTypeCell heroList={agilityHeroList} type='Agility' cnType='敏捷' importing={true}/>
                    <HeroTypeCell heroList={intelligenceHeroList} type='Intelligence' cnType='智力' importing={true}/>
                    <HeroTypeCell heroList={universalHeroList} type='Universal' cnType='全才' importing={true}/>
                </div>}
            </div>
        </div>
    )
}

export default ExistedHero;