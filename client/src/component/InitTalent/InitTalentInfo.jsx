import './InitTalentInfo.css';

const InitTalentInfo = ({ talent }) => {

    return ( talent &&
        <div style={{
            width: '100%',
            position:'absolute',
            zIndex: 5,
            background: 'radial-gradient(circle at 0% 0%, rgb(40, 40, 40), rgb(15, 15, 15))',
            boxShadow: '0px 0px 10px 5px #000000',
        }}>
            <div className="InitTalentInfo">
                <div className="InitTalentTitle" style={{
                    background: talent.InitTalentColor ? talent.InitTalentColor : 'radial-gradient(circle at 25% center, rgba(161, 161, 161, 0.75), rgba(50, 50, 50, 0.75))'
                }}>
                    <div className="InitTalentTitleImage">
                        <img src={`http://localhost:3001/assets/skills/${talent.InitTalentImage}`} />
                    </div>
                    {talent.InitTalentCNName}
                </div>

                {talent.ITAffectSkill1 && <div className='InitTalentDisplay'>
                    <div className='InitTalentAffectSkill'>
                        <div className='HeroPageInitTalentSkillName' style={{
                            display: 'flex',
                            justifyContent: 'start',
                            alignItems: 'center',
                            gap: '3%'
                        }}>
                            {talent.ITAffectSkill1 === '被动技能' ? 
                                <img src={`http://localhost:3001/assets/skills/${talent.InitTalentImage}`} alt='SkillIcon' style={{width:'9%', margin:'1%'}}/> :
                                <img src={`http://localhost:3001/assets/skills/${talent.ITAffectSkill1.split(' ')[0]}_icon.webp`} alt='SkillIcon' style={{width:'9%', margin:'1%'}}/>}
                            {talent.ITAffectSkill1 === '被动技能' ? '被动技能' : talent.ITAffectSkill1.split(' ')[1]}
                        </div>
                    </div>

                    <div className='InitTalentDescription'>
                        {talent.ITDetails1}
                    </div>

                    <div className='InitTalentStatistic'>
                        {talent.ITStatistic1 && talent.ITStatistic1.split('?').map((stat, index) => (
                            <div key={index}>{stat}</div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default InitTalentInfo;