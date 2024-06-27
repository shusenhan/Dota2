import './itempage.css';
import ItemCell from './itemcell';
import {
    Consumables, 
    Attributes,
    Equipment,
    Miscellaneous,
    SecretShop,
    Accessories,
    Support,
    Magical,
    Armor,
    Weapons,
    Artifacts,
    Tier1,
    Tier2,
    Tier3,
    Tier4,
    Tier5,
}  from '../../../itemList.js';
import { useState } from 'react';
import ItemInfo from '../../../component/Item/ItemInfo.jsx';
import { useEffect } from 'react';
import ItemDetails from './itemdetails.jsx';

const ItemPage = () => {
    const [isHovered, setIsHovered] = useState(-1);
    const [itemList, setItemList] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    const GetExistedItem = async() => {
        const serverResponse = await fetch(
            'http://localhost:3001/item/allitems',
            {
                method: 'GET'
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setItemList(result.data);
        }
    }

    const handleMouseEnter = (index) => setIsHovered(index);  
    const handleMouseLeave = () => setIsHovered(-1);

    useEffect(() => {
        GetExistedItem();
    }, []);

    return(
        <div className='ItemPageContent'>
            <div className='ItemPagePartContainer'>
                <div className='ItemPageContentPart1'>
                    基础分类
                    <div className='ItemPageItems'>
                        <div className='ItemPageGridDisplay1'>
                            <div>
                                <div className='ItemPageClassName'>
                                    消耗品
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Consumables.map((item, index) => {
                                        return <div style={{position: 'relative'}} key={index}>
                                            <div 
                                                onMouseEnter={() => handleMouseEnter(index)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <ItemCell name={item[0]} cnName={item[1]}/>
                                            </div>
                                            {
                                                isHovered === index && <ItemInfo/>
                                            }
                                        </div>
                                    })}
                                </div>
                            </div>
                            
                            <div>
                                <div className='ItemPageClassName'>
                                    属性
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Attributes.map((item, index) => {
                                        const keyNum = index + 100;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    装备
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Equipment.map((item, index) => {
                                        const keyNum = index + 200;
                                        return <div style={{position: 'relative'}}  key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    其他
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Miscellaneous.map((item, index) => {
                                        const keyNum = index + 300;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    神秘商店
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {SecretShop.map((item, index) => {
                                        const keyNum = index + 400;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ItemPageContentPart2'>
                    合成分类
                    <div className='ItemPageItems'>
                        <div className='ItemPageGridDisplay1'>
                            <div>
                                <div className='ItemPageClassName'>
                                    配件
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Accessories.map((item, index) => {
                                        const keyNum = index + 500;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    辅助
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Support.map((item, index) => {
                                        const keyNum = index + 600;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    法器
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Magical.map((item, index) => {
                                        const keyNum = index + 700;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    护具
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '防具').sort((a,b) => a.ItemPrice - b.ItemPrice).map((item, index) => {
                                        const keyNum = index + 800;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={() => setCurrentItem(item)}
                                        >
                                            <ItemCell name={item.ItemName} cnName={item.ItemCNName}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo item={item} test={true}/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    武器
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Weapons.map((item, index) => {
                                        const keyNum = index + 900;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ItemPageClassName'>
                                    人造物
                                </div>
                                <div className='ItemPageGridDisplay2'>
                                    {Artifacts.map((item, index) => {
                                        const keyNum = index + 1100;
                                        return <div style={{position: 'relative'}} key={index}>
                                        <div 
                                            onMouseEnter={() => handleMouseEnter(keyNum)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <ItemCell name={item[0]} cnName={item[1]}/>
                                        </div>
                                        {
                                            isHovered === keyNum && <ItemInfo/>
                                        }
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='ItemPageContentPart3'>
                    中立物品
                    <div className='ItemPageItems'>
                        <div className='ItemPageContentTierTitle'>
                            <div>第一级</div>
                            <div>7:00+</div>
                        </div>
                        <div className='ItemPageDisplay3'>
                            {Tier1.map((item, index) => {
                                const keyNum = index + 1200;
                                return <div style={{position: 'relative'}} key={index}>
                                <div 
                                    onMouseEnter={() => handleMouseEnter(keyNum)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ItemCell name={item[0]} cnName={item[1]}/>
                                </div>
                                {
                                    isHovered === keyNum && <ItemInfo/>
                                }
                                </div>
                            })}
                        </div>
                        <div className='ItemPageContentTierTitle'>
                            <div>第二级</div>
                            <div>17:00+</div>
                        </div>
                        <div className='ItemPageDisplay3'>
                            {Tier2.map((item, index) => {
                                const keyNum = index + 1300;
                                return <div style={{position: 'relative'}} key={index}>
                                <div 
                                    onMouseEnter={() => handleMouseEnter(keyNum)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ItemCell name={item[0]} cnName={item[1]}/>
                                </div>
                                {
                                    isHovered === keyNum && <ItemInfo/>
                                }
                                </div>
                            })}
                        </div>
                        <div className='ItemPageContentTierTitle'>
                            <div>第三级</div>
                            <div>27:00+</div>
                        </div>
                        <div className='ItemPageDisplay3'>
                            {Tier3.map((item, index) => {
                                const keyNum = index + 1400;
                                return <div style={{position: 'relative'}} key={index}>
                                <div 
                                    onMouseEnter={() => handleMouseEnter(keyNum)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ItemCell name={item[0]} cnName={item[1]}/>
                                </div>
                                {
                                    isHovered === keyNum && <ItemInfo/>
                                }
                                </div>
                            })}
                        </div>
                        <div className='ItemPageContentTierTitle'>
                            <div>第四级</div>
                            <div>37:00+</div>
                        </div>
                        <div className='ItemPageDisplay3'>
                            {Tier4.map((item, index) => {
                                const keyNum = index + 1500;
                                return <div style={{position: 'relative'}} key={index}>
                                <div 
                                    onMouseEnter={() => handleMouseEnter(keyNum)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ItemCell name={item[0]} cnName={item[1]}/>
                                </div>
                                {
                                    isHovered === keyNum && <ItemInfo/>
                                }
                                </div>
                            })}
                        </div>
                        <div className='ItemPageContentTierTitle'>
                            <div>第五级</div>
                            <div>60:00+</div>
                        </div>
                        <div className='ItemPageDisplay3'>
                            {Tier5.map((item, index) => {
                                const keyNum = index + 1600;
                                return <div style={{position: 'relative'}} key={index}>
                                <div 
                                    onMouseEnter={() => handleMouseEnter(keyNum)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <ItemCell name={item[0]} cnName={item[1]}/>
                                </div>
                                {
                                    isHovered === keyNum && <ItemInfo/>
                                }
                                </div>
                            })}
                        </div>
                    </div>
                </div>

                <div className='ItemPageContentPart4'>
                    物品详情
                    <div className='ItemPageItemDetails'>
                        <ItemDetails item={currentItem}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemPage;