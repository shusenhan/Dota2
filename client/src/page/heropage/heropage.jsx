import './heropage.css'
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Talents from '../../component/Talents/Talents.jsx';
import SkillInfo from '../../component/Skill/SkillInfo.jsx';
import AghanimInfo from '../../component/Aghanim/AghanimInfo.jsx';

const HeroPage = ({}) => {
    let [searchParams] = useSearchParams();  
    let heroName = searchParams.get('heroName'); 
    const [hero, setHero] = useState(null);
    const [heroPageType, setHeroPageType] = useState('简介');
    const [isHovered, setIsHovered] = useState(-1);  
    const [heroSkill, setHeroSkill] = useState(null);
  
    const handleMouseEnter = (index) => setIsHovered(index);  
    const handleMouseLeave = () => setIsHovered(-1);  


    const [level, setLevl] = useState(1);
    const [extraHealth, setExtraHealth] = useState(0);
    const [extraStrength, setExtraStrength] = useState(0);
    const [extraHealthRecover, setExtraHealthRecover] = useState(0);
    const [extraMana, setExtraMana] = useState(0);
    const [extraManaRecover, setExtraManaRecover] = useState(0);
    const [extraIntelligence, setExtraIntelligence] = useState(0);
    const [extraAgility, setExtraAgility] = useState(0);
    const [extraArmor, setExtraArmor] = useState(0);
    const [extraMagicResist, setExtraMagicResist] = useState(0);
    const [extraAttackSpeed, setExtraAttackSpeed] = useState(0);
    const [extraMoveSpeed, setExtraMoveSpeed] = useState(0);
    const [extraMoveSpeedPercentage, setExtraMoveSpeedPercentage] = useState(0);
    const [extraDamage, setExtraDamage] = useState(0);
    const [aghanim, setAghanim] = useState(null);

    const strengthToHealth = 18;
    const strengthToHealthRecover = 0.1;
    const agilityToArmor = 0.17;
    const agilityToAttackSpeed = 1;
    const intelligenceToMana = 12;
    const intelligenceToManaRecover = 0.05;
    const intelligenceToMaicResist = 0.1;


    const GetAttributeIcon = () => {
        if(hero.HeroType === 0){
            return 'http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'
        }
        else if(hero.HeroType === 1){
            return 'http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'
        }
        else if(hero.HeroType === 2){
            return 'http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'
        }
        else if(hero.HeroType === 3){
            return 'http://localhost:3001/assets/commons/Universal_attribute_symbol.webp'
        }
    }

    const CalculateDamage = () => {
        var damage = 0;
        if(hero.HeroType === 0){
            damage = hero.InitStrength * 1 
                + extraDamage 
                + level * hero.StrengthGrowth * 1
                + extraStrength * 1;
        }
        else if(hero.HeroType === 1){
            damage = hero.InitAgility * 1 
                + extraDamage 
                + level * hero.AgilityGrowth * 1
                + extraAgility * 1;
        }
        else if(hero.HeroType === 2){
            damage = hero.InitIntelligence * 1 
                + extraDamage 
                + level * hero.IntelligenceGrowth * 1
                + extraIntelligence * 1;
        }
        else if(hero.HeroType === 3){
            damage = (hero.InitStrength + hero.InitAgility + hero.InitIntelligence) * 0.7 
                + extraDamage 
                + level * (hero.StrengthGrowth + hero.AgilityGrowth + hero.IntelligenceGrowth) * 0.7
                + (extraStrength + extraAgility + extraIntelligence) * 0.7;
        }

        return damage;
    }

    const ChangeLevel = (action) => {
        if (action === 'up' && level < 30){
            setLevl(level + 1)
        } 
        else if(action === 'down' && level > 1){
            setLevl(level - 1)
        } 
    };
    
    const GetHeroData = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/hero/gethero/${heroName}`, 
            { 
                method: "GET",
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setHero(result.data);
            console.log(result.data)
        }
    }

    const GetAghanimData = async () => {

        const serverResponse = await fetch(
            `http://localhost:3001/aghanim/getaghanim/${heroName}`, 
            { 
                method: "GET",
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setAghanim(result.data[0]);
        }
    };

    const GetHeroSkills = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/skill/getheroskill/${heroName}`,
            {
                method: "GET",
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            console.log(result)
            if(result.data instanceof Array){
                setHeroSkill(result.data);
            }
            else{
                setHeroSkill([result.data]);
            }
        }
    }

    useEffect(() => {
        GetHeroData()
    }, [])

    useEffect(() => {
        GetHeroSkills();
        GetAghanimData();
    }, [hero])

    return(
        <div className="HeroPageContent">
            <div className='SingleHeroPageNavbar'>
                <Box 
                    onClick={() => setHeroPageType('简介')} 
                    sx={{
                        position: 'absolute',
                        left: '21.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '简介' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    简介
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
                    onClick={() => setHeroPageType('数据')} 
                    sx={{
                        position: 'absolute',
                        left: '31.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '数据' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    数据
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
                    onClick={() => setHeroPageType('改动')} 
                    sx={{
                        position: 'absolute',
                        left: '36.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '改动' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    改动
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '41.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('介绍')} 
                    sx={{
                        position: 'absolute',
                        left: '41.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '介绍' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    介绍
                </Box>

                <Box style={{
                    position: 'absolute',
                    height: '100%',
                    left: '46.5%',
                    color: 'rgb(161, 161, 161)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                }}>
                    /
                </Box>

                <Box 
                    onClick={() => setHeroPageType('社区')} 
                    sx={{
                        position: 'absolute',
                        left: '46.5%',
                        width: "5%",
                        height: '100%',
                        color: (heroPageType === '社区' ? 'rgb(255, 255, 255)' : 'rgb(161, 161, 161)'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        '&:hover':{
                            color:'rgb(255, 255, 255)',
                            cursor:'pointer'
                        }
                }}>
                    社区
                </Box>
            </div>

            <div className='HeroPageLeft'>
                <div className='HeroPageHeroName'
                    style={{
                        height: '18%',
                        fontSize: '5.5vh',
                        display: 'flex',
                }}>
                    {hero ? hero.HeroCNName : '英雄名字'}
                </div>
                <div style={{
                    height: '8%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                }}>
                    <div className='HeroPageAttributeIcon'>
                        <img src={hero ? GetAttributeIcon() : 'http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'}/>
                    </div>
                    <div className='HeroPageComplexity'>
                        { hero && Array.from({ length: hero.Complixity }, (_, index) => (  
                            <img key={index} src="http://localhost:3001/assets/commons/Filter_complexity_icon.webp" />  
                        ))}
                    </div>
                    <div className='HeroPageAttackType'>
                        攻击类型：
                        {hero ? 
                            (hero.AttackType === 0 ? 
                                <img src="http://localhost:3001/assets/commons/Melee_icon.webp"/> : 
                                <img src="http://localhost:3001/assets/commons/Ranged_icon.webp"/>) : 
                            <img src="http://localhost:3001/assets/commons/Melee_icon.webp"/>}
                    </div>
                    <div className='HeroPageRole'>
                        标签：
                        {hero && hero.IsDisable === 1 && <img src='http://localhost:3001/assets/commons/Filter_disabler_icon.webp'/>}
                        {hero && hero.IsDurable === 1 && <img src='http://localhost:3001/assets/commons/Filter_durable_icon.webp'/>}
                        {hero && hero.IsEscape === 1 && <img src='http://localhost:3001/assets/commons/Filter_escape_icon.webp'/>}
                        {hero && hero.IsInitiator === 1 && <img src='http://localhost:3001/assets/commons/Filter_initiator_icon.webp'/>}
                        {hero && hero.IsNuker === 1 && <img src='http://localhost:3001/assets/commons/Filter_nuker_icon.webp'/>}
                        {hero && hero.IsPusher === 1 && <img src='http://localhost:3001/assets/commons/Filter_pusher_icon.webp'/>}
                    </div>
                </div>
                <div style={{
                    height: '11%',
                    fontSize: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%',
                }}>
                    <div className='HeroPageInitTalent1'>
                        命石1
                    </div>
                    <div className='HeroPageInitTalent2'>
                        命石2
                    </div>
                </div>
                <div style={{
                    height: '13%',
                    fontSize: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    position: 'relative',
                    width: '100%',
                }}>
                    <div className='HeroPageTalentTree' 
                        onMouseEnter={() => handleMouseEnter(98)}
                        onMouseLeave={() => handleMouseLeave()}
                    >
                        {isHovered === 98 && <Box className='HeroPageTalentTreeContainer'>
                            <Talents/>
                        </Box>}
                        <div className='HeroPageTalentTreeBG'></div>
                        <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg'/>
                    </div>

                    <div className='HeroPageInitSkill'>
                        <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg'/>
                    </div>

                    {heroSkill && heroSkill.map((skill, index) => {
                        const keyNumber = index;
                        return(
                            <div key={keyNumber} className='HeroPageSkill'>
                                <div className='HeroPageSkillImage' 
                                    onMouseEnter={() => handleMouseEnter(keyNumber)}
                                    onMouseLeave={() => handleMouseLeave()}
                                >
                                    <img src={`http://localhost:3001/assets/skills/${skill.SkillImage1}`} style={{width: '100%'}}/>
                                </div>
                                {isHovered === keyNumber && <Box className='HeroPageSkillInfo' 
                                    sx={{
                                        top: '-200%',
                                        left: '120%',
                                }}>
                                    <SkillInfo skill={skill}/>
                                </Box>}
                            </div>)
                    })}

                    <div className='HeroPageInitSkill'>
                        <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg' 
                            onMouseEnter={() => handleMouseEnter(99)}
                            onMouseLeave={() => handleMouseLeave()}/>
                        {isHovered === 99 && <div className='HeroPageAghanimContainer'>
                            <AghanimInfo aghanim={aghanim}/>
                        </div>}
                    </div>
                </div>
                <div className='HeroPageDataPanel'>
                    <div className='HeroPageAttributePanel1'>
                        <div className='HeroPageAttributeName1'>
                            力量
                        </div>
                        <div className='HeroPageAttributeData1'>
                            <img src='http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'/>
                            {hero ? (Math.floor(hero.InitStrength
                            + level * hero.StrengthGrowth
                            + extraStrength)) : 0 } + {hero ? hero.StrengthGrowth.toFixed(1) : 0}
                        </div>
                        <div className='HeroPageAttributeName1'>
                            敏捷
                        </div>
                        <div className='HeroPageAttributeData1'>
                            <img src='http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'/>
                            {hero ? (Math.floor(hero.InitAgility
                            + level * hero.AgilityGrowth
                            + extraAgility)) : 0 } + {hero ? hero.AgilityGrowth.toFixed(1) : 0}
                        </div>
                        <div className='HeroPageAttributeName1'>
                            智力
                        </div>
                        <div className='HeroPageAttributeData1'>
                            <img src='http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'/>
                            {hero ? (Math.floor(hero.InitIntelligence
                            + level * hero.IntelligenceGrowth
                            + extraIntelligence)) : 0 } + {hero ? hero.IntelligenceGrowth.toFixed(1) : 0}
                        </div>
                        <div className='HeroPageAttributeName1'>
                            等级
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingLeft: '5%',
                        }}>
                            <ArrowBackIosIcon onClick={() => ChangeLevel('down')} sx={{
                                color: 'rgb(180, 180, 180)',
                                height: '60%',
                                '&:hover':{
                                    color:'rgb(230, 230, 230)',
                                }
                            }}/>
                            <div style={{
                                marginRight: '5%',
                                color: 'gold',
                                fontSize: '2vh',
                            }}>
                                {level}
                            </div>
                            <ArrowForwardIosIcon onClick={() => ChangeLevel('up')} sx={{
                                color: 'rgb(180, 180, 180)',
                                height: '60%',
                                '&:hover':{
                                    color:'rgb(230, 230, 230)',
                                }
                            }}/>
                        </div>
                    </div>
                    <div className='HeroPageAttributePanel2'>
                        <div className='HeroPageHealthManaPanel'>
                            <div className='HeroPageHealth'>
                                最大生命值：
                                <div className='HeroPageHealthBar'>
                                    {hero ? (Math.floor(hero.InitHealth 
                                    + strengthToHealth * hero.InitStrength 
                                    + level * strengthToHealth * hero.StrengthGrowth 
                                    + extraHealth 
                                    + extraStrength * strengthToHealth)) : 0} + {hero ? (hero.InitHealthRecover
                                    + strengthToHealthRecover * hero.InitStrength 
                                    + level * strengthToHealthRecover * hero.StrengthGrowth
                                    + extraHealthRecover
                                    + extraStrength * strengthToHealthRecover).toFixed(2) : 0} 
                                </div>
                            </div>

                            <div className='HeroPageMana'>
                                最大魔法值：
                                <div className='HeroPageManaBar'>
                                    {hero ? (Math.floor(hero.InitMana 
                                    + intelligenceToMana * hero.InitIntelligence
                                    + level * intelligenceToMana * hero.IntelligenceGrowth 
                                    + extraMana 
                                    + extraIntelligence * intelligenceToMana)) : 0} + {hero ? (hero.InitManaRecover 
                                    + intelligenceToManaRecover * hero.InitIntelligence
                                    + level * intelligenceToManaRecover * hero.IntelligenceGrowth 
                                    + extraManaRecover 
                                    + extraIntelligence * intelligenceToManaRecover).toFixed(2) : 0}
                                </div>
                            </div>
                        </div>
                        <div className='HeroPageOtherAttribute'>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'30%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_damage.png'/>
                                <div>
                                {hero ? Math.floor(hero.DamageMin + CalculateDamage()) : 0} - {hero ? 
                                    Math.floor(hero.DamageMax + CalculateDamage()) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                攻速
                                <div>
                                    {hero ? Math.floor(hero.InitAttackSpeed
                                    + hero.InitAgility * agilityToAttackSpeed
                                    + level * hero.AgilityGrowth * agilityToAttackSpeed
                                    + extraAttackSpeed
                                    + extraAgility * agilityToAttackSpeed) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_attack_time.png'/>
                                <div>
                                    {hero ? (hero.AttackRate).toFixed(2) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_attack_range.png'/>
                                <div>
                                    {hero ? Math.floor(hero.AttackRange) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_projectile_speed.png'/>
                                <div>
                                    {hero ? (hero.AttackType === 0 ? 'inf' : Math.floor(hero.ProjectileSpeed)) : 0}
                                </div>
                            </div>
                        </div>

                        <div className='HeroPageExtraAttribute'>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'30%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_vision.png'/>
                                <div>
                                {hero ? Math.floor(hero.DayVision) : 0}/{hero ? Math.floor(hero.NightVision) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/icon_armor.png'/>
                                <div>
                                    {hero ? Math.floor(hero.InitArmor
                                    + hero.InitAgility * agilityToArmor
                                    + level * hero.AgilityGrowth * agilityToArmor
                                    + extraAgility * agilityToArmor
                                    + extraArmor) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/Magic_Resistance_icon.webp'/>
                                <div>
                                    {hero ? Math.floor(hero.InitMagicResist
                                    + hero.InitIntelligence * intelligenceToMaicResist
                                    + level * hero.IntelligenceGrowth * intelligenceToMaicResist
                                    + extraIntelligence * intelligenceToMaicResist
                                    + extraMagicResist) : 0}%
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/Movement_speed_icon.webp'/>
                                <div>
                                    {hero ? Math.floor((hero.MoveSpeed + extraMoveSpeed) * (1 + extraMoveSpeedPercentage)) : 0}
                                </div>
                            </div>
                            <div className='HeroPageAttributeData2' style={{flexBasis:'17.5%'}}>
                                <img src='http://localhost:3001/assets/commons/Turn_rate_icon.webp'/>
                                <div>
                                    {hero ? (hero.TurnRate).toFixed(2) : 0}
                                </div>
                            </div>
                        </div>
                    </div>
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