import { useState, useEffect } from 'react';
import './existskill.css'
import { useNavigate } from 'react-router-dom';
import {strenghHeroList, agilityHeroList, intelligenceHeroList, universalHeroList} from'../../heroList.js'
import HeroTypeCell from '../heropage/TypeCell.jsx';
import { Button } from '@mui/material';

const ExistedSkill = () => {
    const [skillList, setSkillList] = useState(null);
    const navigate = useNavigate();
    const [exsitStrengthHeroList, setStrengthHeroList] = useState([]);
    const [exsitAgilityHeroList, setAgilityHeroList] = useState([]);
    const [exsitIntelligenceHeroList, setIntelligenceHeroList] = useState([]);
    const [exsitUniversalHeroList, setSUniversalHeroList] = useState([]);

    const GetExistedSkill = async() => {
        const serverResponse = await fetch(
            'http://localhost:3001/skill/allskill',
            {
                method: 'GET'
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setSkillList(result.data);
        }
    }

    const ClassifyHeros = () => {
        var strength = [];
        var agility = [];
        var intelligence = [];
        var universal = [];

        for(var i = 0; i < skillList.length; i++){
            if(strenghHeroList.map(hero => hero[0]).includes(skillList[i].Owner)){
                const index = strenghHeroList.map(hero => hero[0]).indexOf(skillList[i].Owner)
                if(!strength.includes(strenghHeroList[index])){
                    strength.push(strenghHeroList[index]);
                }
            }
            else if(agilityHeroList.map(hero => hero[0]).includes(skillList[i].Owner)){
                const index = agilityHeroList.map(hero => hero[0]).indexOf(skillList[i].Owner)
                if(!agility.includes(agilityHeroList[index])){
                    agility.push(agilityHeroList[index]);
                }
            }
            else if(intelligenceHeroList.map(hero => hero[0]).includes(skillList[i].Owner)){
                const index = intelligenceHeroList.map(hero => hero[0]).indexOf(skillList[i].Owner)
                if(!intelligence.includes(intelligenceHeroList[index])){
                    intelligence.push(intelligenceHeroList[index]);
                }
            }
            else if(universalHeroList.map(hero => hero[0]).includes(skillList[i].Owner)){
                const index = universalHeroList.map(hero => hero[0]).indexOf(skillList[i].Owner)
                if(!universal.includes(universalHeroList[index])){
                    universal.push(universalHeroList[index]);
                }
            }
        }

        setStrengthHeroList(strength);
        setAgilityHeroList(agility);
        setIntelligenceHeroList(intelligence);
        setSUniversalHeroList(universal);
    };

    useEffect(() => {
        GetExistedSkill();
    }, []);

    useEffect(() => {
        if(skillList !== null){
            ClassifyHeros();
        }
    }, [skillList])


    return(
        <div className="ExistedSkillContent">
            <div className='ExistedSkillTitle'>
                已有技能
                <div className='ExistedSkillImportButton'>
                    <Button onClick={() => navigate('\import')} 
                        sx={{
                            color:'rgb(161, 161, 161)',
                            '&:hover': {
                                color: 'rgb(210, 210, 210)',
                            }
                    }}>
                    导入新技能</Button>
                </div>
            </div>
            <div className='ExistedSkillContainer'>
                {skillList &&
                <div className='ExistedSkills'>
                    <HeroTypeCell heroList={exsitStrengthHeroList} type='Strength' cnType='力量' skill={true}/>
                    <HeroTypeCell heroList={exsitAgilityHeroList} type='Agility' cnType='敏捷' skill={true}/>
                    <HeroTypeCell heroList={exsitIntelligenceHeroList} type='Intelligence' cnType='智力' skill={true}/>
                    <HeroTypeCell heroList={exsitUniversalHeroList} type='Universal' cnType='全才' skill={true}/>
                </div>}
            </div>
        </div>
    )
};

export default ExistedSkill;