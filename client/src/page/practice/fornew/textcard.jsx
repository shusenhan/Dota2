import { Scroll, useScroll } from "@react-three/drei";
import './textcard.css';
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Descrition = ({descriptions}) => {
    const scroll = useScroll();
    const [activeIndex, setActiveIndex] = useState(null);

    useFrame(() => {
        const scrollY = scroll.offset;
        const index = Math.floor(scrollY * descriptions.length);
        setActiveIndex(index);
    })

    return(
        <Scroll html>
            <div className="DescrptionContent" 
                style={{
                    height: `${descriptions.length * 95}vh`
            }}>
                {descriptions.map((item, index) => 
                    <div key={index} className="DescrptionContentItems" style={{
                        opacity: activeIndex === index ? 1: 0,
                        transition: 'opacity 0.4s'
                    }}>
                        <div className="DescrptionContentText">
                            <div style={{
                                margin: '10% 0 0% 0'
                            }}>
                                <img 
                                    src={`http://localhost:3001/assets/${item.NPCIcon}`} 
                                    alt={item.NPCName} 
                                    style={{
                                        width: '50%',
                                }}/>
                            </div>

                            <div className="NPCHPMP">
                                <div style={{
                                    color: 'white',
                                    fontSize: '2.5vh',
                                    fontFamily: '"Ma Shan Zheng", cursive',
                                    fontWeight: 400,
                                    fontStyle: 'normal',
                                }}>
                                    {item.NPCCNName}
                                </div>
                                <div className="NPCHPBar">
                                    {item.InitHealth} + {item.InitHealthRecover}
                                </div>
                                <div className="NPCMPBar">
                                    {item.InitMana} + {item.InitManaRecover}
                                </div>
                            </div>

                            <div className="NPCAttributes">
                                <div className="NPCAttributesItems">
                                    <div style={{
                                        width: '3vh',
                                        height: '3vh',
                                        background: 'url("http://localhost:3001/assets/commons/icon_damage.png") center/cover'
                                    }}>
                                    </div>
                                    <div>
                                        {item.DamageMin} - {item.DamageMax}
                                    </div>
                                </div>  
                                <div className="NPCAttributesItems">
                                    <div style={{
                                        width: '3vh',
                                        height: '3vh',
                                        background: 'url("http://localhost:3001/assets/commons/icon_armor.png") center/cover'
                                    }}>
                                    </div>
                                    <div>
                                        {item.InitArmor}
                                    </div>
                                </div>
                                <div className="NPCAttributesItems">
                                    <div style={{
                                        width: '3vh',
                                        height: '3vh',
                                        background: 'url("http://localhost:3001/assets/commons/Magic_Resistance_icon.webp") center/cover'
                                    }}>
                                    </div>
                                    <div>
                                        {item.InitMagicResist}
                                    </div>
                                </div>
                            </div>

                            <div className="NPCDescription">
                                {item.NPCDescription}
                            </div>
                        </div>
                    </div>
                )}

                {/* <div className="DescrptionContentItems" style={{
                    opacity: activeIndex === 0 ? 1: 0,
                    transition: 'opacity 0.4s'
                }}>
                    <div className="DescrptionContentText">
                        111
                    </div>
                </div>

                <div className="DescrptionContentItems" style={{
                    opacity: activeIndex === 1 ? 1: 0,
                    transition: 'opacity 0.4s'
                }}>
                    <div className="DescrptionContentText">
                        2223
                    </div>
                </div>

                <div className="DescrptionContentItems" style={{
                    opacity: activeIndex === 2 ? 1: 0,
                    transition: 'opacity 0.4s'
                }}>
                    <div className="DescrptionContentText">
                        333
                    </div>
                </div> */}
            </div>
        </Scroll>
    )
}

export default Descrition;