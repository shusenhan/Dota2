import { useState, useEffect } from 'react';
import './existskill.css'
import { useNavigate } from 'react-router-dom';
import {strenghHeroList, agilityHeroList, intelligenceHeroList, universalHeroList} from'../../heroList.js'
import HeroTypeCell from '../heropage/TypeCell.jsx';
import { Button, Box } from '@mui/material';
import { Tier1 } from '../../itemList.js';
import ItemCell from '../practice/itempage/itemcell.jsx';

const ExistedSkill = () => {
    const [skillList, setSkillList] = useState(null);
    const navigate = useNavigate();
    const [exsitStrengthHeroList, setStrengthHeroList] = useState([]);
    const [exsitAgilityHeroList, setAgilityHeroList] = useState([]);
    const [exsitIntelligenceHeroList, setIntelligenceHeroList] = useState([]);
    const [exsitUniversalHeroList, setSUniversalHeroList] = useState([]);
    const [pageType, setPageType] = useState('英雄');
    const [itemSkillList, setItemSkillList] = useState(null);

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

    const GetItemSkills = async() => {
        const serverResponse = await fetch(
            'http://localhost:3001/skill/allitemskill',
            {
                method: 'GET'
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setItemSkillList(result.data);
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
        GetItemSkills();
    }, []);

    useEffect(() => {
        if(skillList !== null){
            ClassifyHeros();
        }
    }, [skillList])


    return(
        <div className="ExistedSkillContent">
            <div className='ExistedSkillNavbar'>
                <Box 
                    onClick={() => setPageType('英雄')} 
                    sx={{
                        position: 'absolute',
                        left: '21.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '英雄' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
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
                    onClick={() => setPageType('物品')} 
                    sx={{
                        position: 'absolute',
                        left: '26.5%',
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
                    onClick={() => setPageType('单位')} 
                    sx={{
                        position: 'absolute',
                        left: '31.5%',
                        width: "5%",
                        height: '100%',
                        color: (pageType === '单位' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    单位
                </Box>
            </div>

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
            {pageType === '英雄' && <div className='ExistedSkillContainer'>
                {skillList &&
                <div className='ExistedSkills'>
                    <HeroTypeCell heroList={exsitStrengthHeroList} type='Strength' cnType='力量' skill={true}/>
                    <HeroTypeCell heroList={exsitAgilityHeroList} type='Agility' cnType='敏捷' skill={true}/>
                    <HeroTypeCell heroList={exsitIntelligenceHeroList} type='Intelligence' cnType='智力' skill={true}/>
                    <HeroTypeCell heroList={exsitUniversalHeroList} type='Universal' cnType='全才' skill={true}/>
                </div>}
            </div>}

            {pageType === '物品' && <div className='ExistedItemSkillContainer'>
                <div className='ExistedItemPositiveSkill'>
                    主动技能
                    <div className='ExistedSkillItems'>
                        {itemSkillList && itemSkillList.map((item, index) => {
                            if(item.Ability !== '被动'){
                                return (
                                    <ItemCell name={item.Owner}/>
                                )
                            }
                        })}
                    </div>
                </div>
                <div className='ExistedItemNegativeSkill'>
                    被动技能
                    <div className='ExistedSkillItems'>
                        {itemSkillList && itemSkillList.map((item, index) => {
                            if(item.Ability === '被动'){
                                return (
                                    <ItemCell name={item.Owner}/>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>}
        </div>
    )
};

export default ExistedSkill;