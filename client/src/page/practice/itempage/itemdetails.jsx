import './itemdetails.css';
import { useEffect, useState } from 'react';

const ItemDetails = ({item=null}) => {
    const [itemSkill, setItemSkill] = useState(null);

    const GetItemSkill = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/skill/getheroskill/${item.ItemName}`,
            {
                method: 'GET',
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setItemSkill(result.data);
        }
    }

    useEffect(() => {
        if(item){
            GetItemSkill();
        }
    }, [item]);

    return ( itemSkill && item &&
        <div className="ItemDetialsContent">
            <div className='ItemDetailsTitle'>
                <div className='ItemDetailsTitleImage'>
                    {item && <img src={`http://localhost:3001/assets/items/${item.ItemName}_icon.webp`} style={{width: '100%', border:'1px solid black'}}/>}
                </div>
                <div className='ItemDetailsTitleName'>
                    <div className='ItemDetailsTitleCNName'>
                        {item && item.ItemCNName}
                    </div>
                    <div>
                        {item && item.ItemType}
                    </div>
                    <div className='ItemDetailsTitlePrice'>
                        {item && item.ItemPrice}
                    </div>
                </div>
            </div>
            <div className='ItemDetailsDescription'>
                {itemSkill && itemSkill.filter(skill => skill.Ability !== '被动').map((skill, index) => {
                    return(
                        <div key={index}>
                            <div className='ItemInfoSkillInfo1'>
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
                        </div>  
                    )  
                })}

                <div className='ItemInfoAttribute'>
                    {item.Health !== 0 ? <div>+{item.Health}生命值</div> : null}
                    {item.Mana !== 0 ? <div>+{item.Mana}魔法值</div> : null}
                    {item.HealthRecover !== 0 ? <div>+{item.HealthRecover}生命回复</div> : null}
                    {item.ManaRecover !== 0 ? <div>+{item.ManaRecovers}魔法回复</div> : null}
                    {item.Strength !== 0 ? <div>+{item.Strength}力量</div> : null}
                    {item.Agility !== 0 ? <div>+{item.Agility}敏捷</div> : null}
                    {item.Intelligence !== 0 ? <div>+{item.Intelligence}智力</div> : null}
                    {item.Damage !== 0 ? <div>+{item.Damage}攻击力</div> : null}
                    {item.Armor !== 0 ? <div>+{item.Armor}护甲</div> : null}
                    {item.MagicResist !== 0 ? <div>+{item.MagicResist}%魔法抗性</div> : null}
                    {item.AttackSpeed !== 0 ? <div>+{item.AttackSpeed}攻击速度</div> : null}
                    {item.MoveSpeed !== 0 ? <div>+{item.MoveSpeed}移动速度</div> : null}
                    {item.MoveSpeedPercentage !== 0 ? <div>+{item.MoveSpeedPercentage}%移动速度</div> : null}
                    {item.HealthSteal !== 0 ? <div>+{item.HealthSteal}%吸血</div> : null}
                    {item.SkillHealthSteal !== 0 ? <div>+{item.SkillHealthSteal}%技能吸血</div> : null}
                    {item.SkillEnhence !== 0 ? <div>+{item.SkillEnhence}%技能强化</div> : null}
                    {item.Dodge !== 0 ? <div>+{item.Dodge}%闪避</div> : null}
                    {item.OtherAttribute && item.OtherAttribute.split('?').map((attribute, index) => 
                        <div key={index}>
                            {attribute}
                        </div>
                    )}
                </div>

                {itemSkill && itemSkill.filter(skill => skill.Ability !== '被动').map((skill, index) => {
                    return(
                        <div key={index}>
                            <div className='ItemInfoPositiveSkill'>
                                <div className='ItemInfoPositiveSkillTitle'>
                                    <div className='ItemInfoPositiveSkillName'>
                                        主动：{skill.SkillCNName}
                                    </div>
                                    <div className='ItemInfoPositiveSkillCostAndCD'>
                                        <div className='ItemInfoPositiveSkillCost'>
                                            <div style={{
                                                height:'82%', 
                                                width:'21%', 
                                                background:'linear-gradient(#00A4DB, #007196)',
                                                borderRadius:'3px',
                                                marginRight:'5%'
                                            }}>
                                            </div>
                                            {skill.Cost !== '0' && skill.Cost}
                                        </div>
                                        <div className='ItemInfoPositiveSkillCD'>
                                            <img src='http://localhost:3001/assets/commons/cooldown.png' alt='CD' 
                                                style={{
                                                    width:'21%', 
                                                    marginRight:'5%',
                                                    borderRadius:'3px',
                                            }}/>
                                            {skill.SkillCD !== '0' && skill.SkillCD}
                                        </div>
                                    </div>
                                </div>
                                <div className='ItemInfoSkillDescription'>
                                    {skill.SkillDescription.split('?').map((str, index) => 
                                        <div key={index}>
                                            {str}
                                        </div>)}
                                </div>
                            </div>
                        </div>  
                    )  
                })}

                {itemSkill && itemSkill.filter(skill => skill.Ability === '被动').map((skill, index) => {
                    return(
                        <div key={index}>
                            <div className='ItemInfoNegativeSkill'>
                                <div className='ItemInfoNegativeSkillTitle'>
                                    <div className='ItemInfoNegativeSkillName'>
                                        被动：{skill.SkillCNName}
                                    </div>
                                    
                                </div>
                                <div className='ItemInfoSkillDescription'>
                                    {skill.SkillDescription.split('?').map((str, index) => 
                                        <div key={index}>
                                            {str}
                                        </div>)}
                                </div>
                            </div>
                        </div>  
                    )  
                })}

                <div className='ItemInfoPageExtraInfo'>
                    {item.ItemExtraInfo && item.ItemExtraInfo.split('?').map((str, index) => 
                        <div key={index}>
                            {str}
                        </div>
                    )}
                </div>

                <div className='ItemInfoPageBackground'>
                    {item.ItemBackground}
                </div>
            </div>
            <div className='ItemDetailsLargeImage'>
                <div className='ItemDetailsLargeImageBorder'>

                </div>
            </div>
        </div>
    )
};

export default ItemDetails;