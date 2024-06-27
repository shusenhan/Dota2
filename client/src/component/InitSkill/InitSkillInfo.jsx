import './InitSkillInfo.css';

const InitSkillInfo = ({ skill }) => {
    return(
        <div style={{
            width: '100%',
            position:'absolute',
            zIndex: 5,
            background: 'radial-gradient(circle at 0% 0%, rgb(40, 40, 40), rgb(15, 15, 15))',
            boxShadow: '0px 0px 10px 5px #000000',
        }}>
            <div className="InitTalentInfo">
                <div className="InitSkillTitle" style={{
                    background: 'radial-gradient(circle at 25% center, rgba(161, 161, 161, 0.75), rgba(50, 50, 50, 0.75))'
                }}>
                    <div className="InitSkillTitleImage">
                        {skill.SkillImage1 ? <img src={`http://localhost:3001/assets/skills/${skill.SkillImage1}`} style={{width:'100%'}}/> : 
                        <img src={`http://localhost:3001/assets/commons/innate_icon.png`} style={{width:'100%'}}/>}
                    </div>
                    <div style={{marginLeft: '2%', flexBasis:'25%', textAlign:'center'}}>
                        {skill.SkillCNName}
                        <div className='InitSkillTiltleSkillName'>
                            先天技能
                        </div>
                    </div>
                </div>

                <div className='InitSkillInfoSkillPanel'>
                    <div className='InitSkillInfoInfo1'>
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

                    <div className='InitSkillInfoDescription'>
                        {skill.SkillDescription}
                    </div>

                    {skill.InitTalent && <div>
                        <div className='InitSkillInfoInitTalent' >
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
                            <div className='InitSkillInfoInitTalentName' style={{
                                paddingLeft: '3%',
                            }}>
                                {skill.InitTalent}
                            </div>
                        </div>
                        <div className='InitSkillInfoInitTalentDescription' >
                            {skill.InitTalentDescription}
                        </div>
                    </div>}

                    <div className='InitSkillInfoDetails'>
                        {skill.ExtraInfo1.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>

                    <div className='InitSkillInfoSkillStatistic'>
                        {skill.ExtraInfo2.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>

                    <div className='InitSkillInfoCostCD'>
                        {skill.SkillCD !== '0' && <div style={{flexBasis:'33%', display: 'flex'}}>
                            <div style={{
                                height:'72%', 
                                width:'10%', 
                                background:'linear-gradient(#00A4DB, #007196)',
                                borderRadius:'3px',
                                marginRight:'5%'
                            }}>
                            </div>
                            {skill.SkillCD}
                        </div>}

                        {skill.Cost !== '0' && <div style={{flexBasis:'33%', display: 'flex'}}>
                            <img src='http://localhost:3001/assets/commons/cooldown.png' alt='CD' 
                                style={{
                                    height: '72%', 
                                    width:'10%', 
                                    marginRight:'5%',
                                    borderRadius:'3px',
                            }}/>
                            {skill.Cost}
                        </div>}
                        
                        {skill.CastRange !== '0' &&  <div style={{flexBasis:'33%', display: 'flex'}}>
                            <div style={{
                                    height:'72%', 
                                    width:'10%', 
                                    background:'#5CFF1C',
                                    marginRight:'5%',
                                    borderRadius:'3px',
                            }}>
                            </div>
                            {skill.CastRange}
                        </div>}
                    </div>

                    {skill.ExtraInfo3 && <div className='InitSkillInfoExtraInfo'>
                        {skill.ExtraInfo3.split('?').map((str, index) => <div key={index}>{str}</div>)}
                    </div>}
                </div>
            </div>                        
        </div>
    )
}

export default InitSkillInfo;