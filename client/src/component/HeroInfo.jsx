import { useState } from 'react';
import Image from './Image';
import { Box, Slider } from '@mui/material';
import Talents from './Talents/Talents';
import Iventory from './Iventory/Iventory';

const HeroInfo = ({hero}) => {

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


    const strengthToHealth = 18;
    const strengthToHealthRecover = 0.1;
    const agilityToArmor = 0.17;
    const agilityToAttackSpeed = 1;
    const intelligenceToMana = 12;
    const intelligenceToManaRecover = 0.05;
    const intelligenceToMaicResist = 0.1;

    const GetBackgroundColor = () => {
        if(hero.HeroType === 0){
            return 'linear-gradient(0deg, #4A3000, #B9500B)'
        }
        else if(hero.HeroType === 1){
            return 'linear-gradient(0deg, #2C4A00, #167C13)'
        }
        else if(hero.HeroType === 2){
            return 'linear-gradient(0deg, #00494A, #257DAE)'
        }
        else if(hero.HeroType === 3){
            return 'linear-gradient(0deg, #460051, ##AE11C7)'
        }
    }

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

    const ChangeLevel = (event) => {
        setLevl(event.target.value)
    };

    return(
        <div style={{
            display: 'flex',
            gap: '24px'
        }}>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '2px',
                border: '2px solid rgb(0,0,0)',
            }}>
                <div style={{
                    background: GetBackgroundColor()
                }}>
                    <div>{hero.HeroCNName}</div>
                    <div style={{
                        margin: '5px 0px',
                        position: 'relative'
                    }}>
                        <Image width='220px' height='124px' src={`http://localhost:3001/assets/heros/${hero.HeroName}_icon.webp`}/>
                        <Box 
                            sx={{
                                width:'40px', 
                                height:'40px', 
                                position:'absolute', 
                                top:'105px', 
                                left:'-23px',
                                background:'radial-gradient(circle at center, #FFE605, #734B00)',
                                borderRadius:'20px',
                                border: '2px solid #484733',
                                fontSize:'20px',
                                fontWeight: '700',
                                color: 'white',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                zIndex: 9,
                                '&:hover > div': {
                                    display: 'block',
                                }
                        }}>{level}
                            <Box
                                sx={{
                                    display: 'none',
                                    position: 'absolute',
                                    top:'-102px',
                                    left: '3px'
                            }}>
                                <Slider
                                    min={1}
                                    max={30}
                                    orientation="vertical"
                                    valueLabelDisplay="auto"
                                    value={level}
                                    onChange={ChangeLevel}
                                    defaultValue={1}
                                    sx={{
                                        height:'100px',
                                        color: '#C59A01'
                                    }}
                                />
                            </Box>
                        </Box>
                    </div>
                    <div >
                        <img src={GetAttributeIcon()}/>
                    </div>
                </div>

                <div style={{
                    display: 'table',
                    width:'100%',
                }}>
                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #286323, #7AF03C)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            生命值
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {Math.floor(hero.InitHealth 
                            + strengthToHealth * hero.InitStrength 
                            + level * strengthToHealth * hero.StrengthGrowth 
                            + extraHealth 
                            + extraStrength * strengthToHealth)}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{(hero.InitHealthRecover
                            + strengthToHealthRecover * hero.InitStrength 
                            + level * strengthToHealthRecover * hero.StrengthGrowth
                            + extraHealthRecover
                            + extraStrength * strengthToHealthRecover).toFixed(2)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #1056DB, #73F5FE)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            魔法值
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {Math.floor(hero.InitMana 
                            + intelligenceToMana * hero.InitIntelligence
                            + level * intelligenceToMana * hero.IntelligenceGrowth 
                            + extraMana 
                            + extraIntelligence * intelligenceToMana)}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{(hero.InitManaRecover 
                            + intelligenceToManaRecover * hero.InitIntelligence
                            + level * intelligenceToManaRecover * hero.IntelligenceGrowth 
                            + extraManaRecover 
                            + extraIntelligence * intelligenceToManaRecover).toFixed(2)}
                        </div>
                    </div>
                </div>
                
                
                <div style={{
                    display: 'table',
                    width:'100%',
                    borderTop: '2px solid black'
                }}>
                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #4A3000, #B9500B)'
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white',
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'/>
                            力量
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {Math.floor(hero.InitStrength
                            + level * hero.StrengthGrowth
                            + extraStrength)}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            +{hero.StrengthGrowth.toFixed(1)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #2C4A00, #167C13)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'/>
                            敏捷
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {Math.floor(hero.InitAgility
                            + level * hero.AgilityGrowth
                            + extraAgility)}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{hero.AgilityGrowth.toFixed(1)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                        background: 'linear-gradient(to right, #00494A, #257DAE)',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white',
                            textAlign:'center',
                            justifyContent:'center'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'/>
                            智力
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'60%',
                            fontWeight: 700,
                            textShadow: '1px 1px 2px #000',
                            color: 'white'
                        }}>
                            {Math.floor(hero.InitIntelligence
                            + level * hero.IntelligenceGrowth
                            + extraIntelligence)}
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '11px',
                            width:'20%',
                            color: 'black'
                        }}>
                            +{hero.IntelligenceGrowth.toFixed(1)}
                        </div>
                    </div>
                </div>

                <Box sx={{
                    display: 'table',
                    width:'100%',
                    borderTop: '2px solid black',
                    '& > div:nth-child(even)': {
                        backgroundColor: '#CCCCCA'
                    },
                }}>
                    <Box sx={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'30%',
                            color: 'black',
                        }}>
                            护甲
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'70%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.InitArmor
                            + hero.InitAgility * agilityToArmor
                            + level * hero.AgilityGrowth * agilityToArmor
                            + extraAgility * agilityToArmor
                            + extraArmor)}
                        </div>
                    </Box>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            <Image height='12px' src='http://localhost:3001/assets/commons/Magic_Resistance_icon.webp'/>
                            魔抗
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.InitMagicResist
                            + hero.InitIntelligence * intelligenceToMaicResist
                            + level * hero.IntelligenceGrowth * intelligenceToMaicResist
                            + extraIntelligence * intelligenceToMaicResist
                            + extraMagicResist)}%
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Movement_speed_icon.webp'/>
                            移速
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {Math.floor((hero.MoveSpeed + extraMoveSpeed) * (1 + extraMoveSpeedPercentage))}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'20%',
                            color: 'black'
                        }}>
                            
                            <Image height='12px' src='http://localhost:3001/assets/commons/Turn_rate_icon.webp'/>
                            转身速率
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'80%',
                            color: 'black'
                        }}>
                            {(hero.TurnRate).toFixed(2)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击力
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.DamageMin + CalculateDamage())}-{Math.floor(hero.DamageMax + CalculateDamage())}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击速度
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.InitAttackSpeed
                            + hero.InitAgility * agilityToAttackSpeed
                            + level * hero.AgilityGrowth * agilityToAttackSpeed
                            + extraAttackSpeed
                            + extraAgility * agilityToAttackSpeed)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击间隔
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {(hero.AttackRate).toFixed(2)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            {!hero.AttackType ? <Image height='12px' src='http://localhost:3001/assets/commons/Melee_icon.webp'/> : <Image height='12px' src='http://localhost:3001/assets/commons/Ranged_icon.webp'/>}
                            攻击距离
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.AttackRange)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            攻击动画
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {(hero.AttackAnimation1).toFixed(2)}/{(hero.AttackAnimation2).toFixed(2)}
                        </div>
                    </div>

                    <div style={{
                        display: 'table-row',
                    }}>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'35%',
                            color: 'black'
                        }}>
                            视野
                        </div>
                        <div style={{
                            display: 'table-cell',
                            fontSize: '12px',
                            width:'65%',
                            color: 'black'
                        }}>
                            {Math.floor(hero.DayVision)}<Image height='12px' src='http://localhost:3001/assets/commons/Daytime_icon.webp'/>/
                            {Math.floor(hero.NightVision)}<Image height='12px' src='http://localhost:3001/assets/commons/Nighttime_icon.webp'/>
                        </div>
                    </div>
                </Box>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Talents/>
                <Iventory/>
            </div>
        </div>
    )
}

export default HeroInfo;