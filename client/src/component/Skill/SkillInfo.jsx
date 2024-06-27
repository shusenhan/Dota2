import { useState } from "react";
import './SkillInfo.css';

const SkillInfo = ({skill}) => {

    return(
        <div className="SkillInfoContent">

            <div className='SkillInfoSkills'>
                <div className='SkillInfoSkillPanel'>
                    <div className='SkillInfoSkillName'>
                        {skill.SkillCNName}
                    </div>
                    <div className='SkillInfoInfo1'>
                        <div>
                            技能： {skill.Ability}
                        </div>
                        <div>
                            影响： {skill.Affect}
                        </div>
                        <div>
                            无视减益免疫： {skill.IgnoreBKB}
                        </div>
                        <div >
                            能否驱散：{skill.Dispellable}
                        </div>
                        <div >
                            伤害类型：{skill.DamageType}
                        </div>
                    </div>

                    <div className='SkillInfoDescription'>
                        {skill.SkillDescription}
                    </div>

                    {skill.InitTalent && <div>
                        <div className='SkillInfoInitTalent' >
                            <div style={{
                                paddingRight: '3%',
                            }}>
                                命石
                            </div>
                            <div style={{
                                height: '1px',
                                backgroundColor: 'rgb(111,111,111)',
                                flex: 1
                            }}>
                            </div>
                            <div className='SkillInfoInitTalentName' style={{
                                paddingLeft: '3%',
                            }}>
                                {skill.InitTalent}
                            </div>
                        </div>
                        <div className='SkillInfoInitTalentDescription' >
                            {skill.InitTalentDescription}
                        </div>
                    </div>}

                    <div className='SkillInfoDetails'>
                        {skill.ExtraInfo1.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>

                    <div className='SkillInfoSkillStatistic'>
                        {skill.ExtraInfo2.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>

                    <div className='SkillInfoCostCD'>
                        <div style={{flexBasis:'33%', display: 'flex'}}>
                            <div style={{
                                height:'72%', 
                                width:'10%', 
                                background:'linear-gradient(#00A4DB, #007196)',
                                borderRadius:'3px',
                                marginRight:'5%'
                            }}>
                            </div>
                            {skill.SkillCD !== '0' && skill.SkillCD}
                        </div>

                        <div style={{flexBasis:'33%', display: 'flex'}}>
                            <img src='http://localhost:3001/assets/commons/cooldown.png' alt='CD' 
                                style={{
                                    height: '72%', 
                                    width:'10%', 
                                    marginRight:'5%',
                                    borderRadius:'3px',
                            }}/>
                            {skill.Cost !== '0' && skill.Cost}
                        </div>
                        
                        <div style={{flexBasis:'33%', display: 'flex'}}>
                            <div style={{
                                    height:'72%', 
                                    width:'10%', 
                                    background:'#5CFF1C',
                                    marginRight:'5%',
                                    borderRadius:'3px',
                            }}>
                            </div>
                            {skill.CastRange !== '0' && skill.CastRange}
                        </div>
                    </div>

                    <div className='SkillInfoExtraInfo'>
                        {skill.ExtraInfo3.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SkillInfo;