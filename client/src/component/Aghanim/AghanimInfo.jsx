import './AghanimInfo.css';

const AghanimInfo = ({aghanim}) => {

    return( aghanim &&
        <div style={{
            width: '100%',
            position:'absolute',
            zIndex: 5,
            background: 'radial-gradient(circle at 0% 0%, rgb(40, 40, 40), rgb(15, 15, 15))',
            boxShadow: '0px 0px 10px 5px #000000',
        }}>
            <div className="AghanimInfo">
                <div className="AghanimTitle">
                    阿哈利姆神杖
                </div>
                {aghanim.AffectSkill1 && aghanim.IsShard1 === 0 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill1 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill1.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill1 === '先天技能' ? '先天技能' : aghanim.AffectSkill1.split(' ')[1] || '先天技能'}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew1 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description1}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo1.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill2 && aghanim.IsShard2 === 0 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill2 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill2.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill2 === '先天技能' ? '先天技能' : aghanim.AffectSkill2.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew1 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description2}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo2.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill3 && aghanim.IsShard3 === 0 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill3 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill3.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill3 === '先天技能' ? '先天技能' : aghanim.AffectSkill3.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew3 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description3}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo3.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill4 && aghanim.IsShard4 === 0 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill4 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill4.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill4 === '先天技能' ? '先天技能' : aghanim.AffectSkill4.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew4 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description4}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo4.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}
            </div>

            <div className="AghanimInfo">
                <div className="AghanimTitle">
                    阿哈利姆魔晶
                </div>
                {aghanim.AffectSkill1 && aghanim.IsShard1 === 1 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill1 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill1.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill1 === '先天技能' ? '先天技能' : aghanim.AffectSkill1.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew1 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description1}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo1.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill2 && aghanim.IsShard2 === 1 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill2 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill2.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill2 === '先天技能' ? '先天技能' : aghanim.AffectSkill2.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew1 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description2}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo2.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill3 && aghanim.IsShard3 === 1 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill3 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill3.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill3 === '先天技能' ? '先天技能' : aghanim.AffectSkill3.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew3 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description3}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo3.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}

                {aghanim.AffectSkill4 && aghanim.IsShard4 === 1 &&
                <div className='AghanimDisplay'>
                    <div className='AghanimImage'>
                        {aghanim.AffectSkill4 !== '先天技能' && <img src={`http://localhost:3001/assets/skills/${aghanim.AffectSkill4.split(' ')[0]}_icon.webp`}/>}
                    </div>
                     
                    <div className='AghanimDescription'>
                        <div className='AghanimSkillName'>
                            {aghanim.AffectSkill4 === '先天技能' ? '先天技能' : aghanim.AffectSkill4.split(' ')[1]}
                        </div>
                        <div className='AghanimIsNew'>
                            {aghanim.IsNew4 === 1 ? '新技能' : '升级'}
                        </div>
                        <div className='AghanimDetails'>
                            {aghanim.Description4}
                        </div>
                        <div className='AghanimStatistic'>
                        {aghanim.ExtraInfo4.split('?').map((str, index) => <div key={index}>{str}</div>)}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default AghanimInfo;
