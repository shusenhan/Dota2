import './existeditem.css';
import { useEffect, useState } from 'react';
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
}  from '../../itemList.js';
import ItemCell from '../practice/itempage/itemcell';
import { Formik } from 'formik';
import * as yup from "yup";
import InputPanel from '../herodataimport/InputPanel.jsx';
import CustomSelect from '../../component/MySelect.jsx';
import CustomTextField from '../../component/MytTextField.jsx';
import CustomTextArea from '../../component/MyTextArea.jsx';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import notify from '../../component/ToastBox.tsx';
import React from 'react';


const itemSchema = yup.object().shape({
    ItemName: yup.string().required('请输入值'),
    ItemCNName: yup.string().required('请输入值'),
    ItemImage1: yup.string(),
    ItemImage2: yup.string(),

    ItemType: yup.string().required('请输入值'),
    ItemExtraInfo: yup.string(),
    ItemDescription: yup.string(),
    ItemBackground: yup.string(),
    Health: yup.number().typeError('请输入数字'),

    Mana: yup.number().typeError('请输入数字'),
    HealthRecover: yup.number().typeError('请输入数字'),
    ManaRecover: yup.number().typeError('请输入数字'),
    Damage: yup.number().typeError('请输入数字'),
    Strength: yup.number().typeError('请输入数字'),

    Agility: yup.number().typeError('请输入数字'),
    Intelligence: yup.number().typeError('请输入数字'),
    Armor: yup.number().typeError('请输入数字'),
    MagicResist: yup.number().typeError('请输入数字'),
    AttackSpeed: yup.number().typeError('请输入数字'),

    Movespeed: yup.number().typeError('请输入数字'),
    MovespeedPercentage: yup.number().typeError('请输入数字'),
    HealthSteal: yup.number().typeError('请输入数字'),
    SkillHealthSteal: yup.number().typeError('请输入数字'),
    SkillEnhence: yup.number().typeError('请输入数字'),

    Dodge: yup.number().typeError('请输入数字'),
    OtherAttribute: yup.string(),
    ItemPrice: yup.number().required('请输入值').typeError('请输入数字'),
})

const initValue = {
    ItemName: '',
    ItemCNName: '',
    ItemImage1: '',
    ItemImage2: '',

    ItemType: '',
    ItemExtraInfo: '',
    ItemDescription: '',
    ItemBackground: '',
    Health: 0,

    Mana: 0,
    HealthRecover: 0,
    ManaRecover: 0,
    Damage: 0,
    Strength: 0,

    Agility: 0,
    Intelligence: 0,
    Armor: 0,
    MagicResist: 0,
    AttackSpeed: 0,

    Movespeed: 0,
    MovespeedPercentage: 0,
    HealthSteal: 0,
    SkillHealthSteal: 0,
    SkillEnhence: 0,

    Dodge: 0,
    OtherAttribute: '',
    ItemPrice: 0
};



const ExistedItem = () => {
    const [itemList, setItemList] = useState(null);
    const [openInputPanel, setOpenInputPanel] = useState(false);
    const [inputPanelContent, setInputPanelContent] = useState('');
    const [isHovered, setIsHovered] = useState(-1);

    const handleMouseEnter = (index) => setIsHovered(index);  
    const handleMouseLeave = () => setIsHovered(-1);

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

    const UploadData = async (values, onSubmitProps) => {
        console.log('values :',values);

        const serverResponse = await fetch(
            "http://localhost:3001/item/insert",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );

        const result = await serverResponse.json();
        
        
        if(serverResponse.status === 200){
            notify('success', result.message);
        }
        else{
            notify('error', result.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await UploadData(values, onSubmitProps);
    }

    useEffect(() => {
        GetExistedItem();
    }, []);

    return (
        <div className="ExistedItemContent">
            <div className='ExistedItemTitle'>
                已有物品
            </div>

            <div className='ExistedItemContainer'>
                <div className='ExistedItemPart1'>
                    基础分类
                    {itemList && <div className='ExistedItems'>
                        <div className='ExsitedItemGridDisplay1'>
                            <div>
                                <div className='ExsitedItemClassName'>
                                    消耗品
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '消耗品').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>
                            
                            <div>
                                <div className='ExsitedItemClassName'>
                                    属性
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '属性').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    装备
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '装备').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    其他
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '其他').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    神秘商店
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '神秘商店').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>

                <div className='ExistedItemPart2'>
                    合成分类
                    {itemList && <div className='ExistedItems'>
                        <div className='ExsitedItemGridDisplay1'>
                            <div>
                                <div className='ExsitedItemClassName'>
                                    配件
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '配件').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    辅助
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '辅助').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    法器
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '法器').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    防具
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '防具').map((item, index) => {
                                        return <ItemCell key={index} name={item.ItemName} cnName={item.ItemCNName}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    兵刃
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '兵刃').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>

                            <div>
                                <div className='ExsitedItemClassName'>
                                    宝物
                                </div>
                                <div className='ExsitedItemGridDisplay2'>
                                    {itemList.filter(item => item.ItemType === '宝物').map((item, index) => {
                                        return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>

                <div className='ExistedItemPart3'>
                    中立物品
                    {itemList &&  <div className='ExistedItems'>
                        <div className='ExistedItemTierTitle'>
                            <div>第一级</div>
                            <div>7:00+</div>
                        </div>
                        <div className='ExistedItemDisplay3'>
                            {itemList.filter(item => item.ItemType === '第一级').map((item, index) => {
                                return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                            })}
                        </div>
                        <div className='ExistedItemTierTitle'>
                            <div>第二级</div>
                            <div>17:00+</div>
                        </div>
                        <div className='ExistedItemDisplay3'>
                            {itemList.filter(item => item.ItemType === '第二级').map((item, index) => {
                                return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                            })}
                        </div>
                        <div className='ExistedItemTierTitle'>
                            <div>第三级</div>
                            <div>27:00+</div>
                        </div>
                        <div className='ExistedItemDisplay3'>
                            {itemList.filter(item => item.ItemType === '第三级').map((item, index) => {
                                return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                            })}
                        </div>
                        <div className='ExistedItemTierTitle'>
                            <div>第四级</div>
                            <div>37:00+</div>
                        </div>
                        <div className='ExistedItemDisplay3'>
                            {itemList.filter(item => item.ItemType === '第四级').map((item, index) => {
                                return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                            })}
                        </div>
                        <div className='ExistedItemTierTitle'>
                            <div>第五级</div>
                            <div>60:00+</div>
                        </div>
                        <div className='ExistedItemDisplay3'>
                            {itemList.filter(item => item.ItemType === '第五级').map((item, index) => {
                                return <ItemCell key={index} name={item[0]} cnName={item[1]}/>
                            })}
                        </div>
                    </div>}
                </div>

                <div className='ExistedItemPart4'>
                    <Formik 
                        onSubmit={handleFormSubmit}
                        initialValues={initValue}
                        validationSchema={itemSchema}
                        enableReinitialize={true}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            resetForm,
                        }) => (
                        <form className='ExistedItemPart4Container' onSubmit={handleSubmit}>
                            {openInputPanel &&
                            <InputPanel switcher={setOpenInputPanel}>
                                {inputPanelContent === 'ItemName' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='物品名称'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ItemCNName}
                                            name="ItemCNName"
                                            error={touched.ItemCNName && Boolean(errors.ItemCNName)}  
                                            helperText={errors.ItemCNName}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='物品英文名称'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ItemName}
                                            name="ItemName"
                                            error={touched.ItemName && Boolean(errors.ItemName)}  
                                            helperText={errors.ItemName}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <FormControl fullWidth sx={{gridColumn: "span 2", height:"100%"}}>
                                            <InputLabel id="ItemType">物品分类</InputLabel>
                                            <CustomSelect
                                                labelId="ItemType"
                                                label="ItemType"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.ItemType}
                                                defaultValue="消耗品"
                                                name="ItemType"
                                                error={Boolean(touched.ItemType) && Boolean(errors.ItemType)}
                                                helperText={touched.ItemType && errors.ItemType}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value='消耗品'>
                                                    消耗品
                                                </MenuItem>
                                                <MenuItem value='属性'>
                                                    属性
                                                </MenuItem>
                                                <MenuItem value='装备'>
                                                    装备
                                                </MenuItem>
                                                <MenuItem value='其他'>
                                                    其他
                                                </MenuItem>
                                                <MenuItem value='神秘商店'>
                                                    神秘商店
                                                </MenuItem>
                                                <MenuItem value='配件'>
                                                    配件
                                                </MenuItem>
                                                <MenuItem value='辅助'>
                                                    辅助
                                                </MenuItem>
                                                <MenuItem value='法器'>
                                                    法器
                                                </MenuItem>
                                                <MenuItem value='防具'>
                                                    防具
                                                </MenuItem>
                                                <MenuItem value='兵刃'>
                                                    兵刃
                                                </MenuItem>
                                                <MenuItem value='宝物'>
                                                    宝物
                                                </MenuItem>
                                                <MenuItem value='第一级'>
                                                    第一级
                                                </MenuItem>
                                                <MenuItem value='第二级'>
                                                    第二级
                                                </MenuItem>
                                                <MenuItem value='第三级'>
                                                    第三级
                                                </MenuItem>
                                                <MenuItem value='第四级'>
                                                    第四级
                                                </MenuItem>
                                                <MenuItem value='第五级'>
                                                    第五级
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <CustomTextField  
                                            label='价格'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ItemPrice}
                                            name="ItemPrice"
                                            error={touched.ItemPrice && Boolean(errors.ItemPrice)}  
                                            helperText={errors.ItemPrice}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'HealthMana' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='生命值'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Health}
                                            name="Health"
                                            error={touched.Health && Boolean(errors.Health)}  
                                            helperText={errors.Health}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='魔法值'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Mana}
                                            name="Mana"
                                            error={touched.Mana && Boolean(errors.Mana)}  
                                            helperText={errors.Mana}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='生命值恢复'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.HealthRecover}
                                            name="HealthRecover"
                                            error={touched.HealthRecover && Boolean(errors.HealthRecover)}  
                                            helperText={errors.HealthRecover}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='魔法值恢复'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ManaRecover}
                                            name="ManaRecover"
                                            error={touched.ManaRecover && Boolean(errors.ManaRecover)}  
                                            helperText={errors.ManaRecover}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Attribute' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='力量'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Strength}
                                            name="Strength"
                                            error={touched.Strength && Boolean(errors.Strength)}  
                                            helperText={errors.Strength}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='敏捷'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Agility}
                                            name="Agility"
                                            error={touched.Agility && Boolean(errors.Agility)}  
                                            helperText={errors.Agility}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='智力'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Intelligence}
                                            name="Intelligence"
                                            error={touched.Intelligence && Boolean(errors.Intelligence)}  
                                            helperText={errors.Intelligence}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Attack' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='攻击力'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Damage}
                                            name="Damage"
                                            error={touched.Damage && Boolean(errors.Damage)}  
                                            helperText={errors.Damage}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='攻击速度'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.AttackSpeed}
                                            name="AttackSpeed"
                                            error={touched.AttackSpeed && Boolean(errors.AttackSpeed)}  
                                            helperText={errors.AttackSpeed}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Defence' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='护甲'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Armor}
                                            name="Armor"
                                            error={touched.Armor && Boolean(errors.Armor)}  
                                            helperText={errors.Armor}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='魔法抗性'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.MagicResist}
                                            name="MagicResist"
                                            error={touched.MagicResist && Boolean(errors.MagicResist)}  
                                            helperText={errors.MagicResist}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Move' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='移动速度'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Movespeed}
                                            name="Movespeed"
                                            error={touched.Movespeed && Boolean(errors.Movespeed)}  
                                            helperText={errors.Movespeed}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='百分比移速加成'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.MovespeedPercentage}
                                            name="MovespeedPercentage"
                                            error={touched.MovespeedPercentage && Boolean(errors.MovespeedPercentage)}  
                                            helperText={errors.MovespeedPercentage}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Other' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'100%',
                                        margin: '2%'
                                    }}>
                                        <CustomTextField  
                                            label='吸血'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.HealthSteal}
                                            name="HealthSteal"
                                            error={touched.HealthSteal && Boolean(errors.HealthSteal)}  
                                            helperText={errors.HealthSteal}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='技能吸血'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.SkillHealthSteal}
                                            name="SkillHealthSteal"
                                            error={touched.SkillHealthSteal && Boolean(errors.SkillHealthSteal)}  
                                            helperText={errors.SkillHealthSteal}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='技能增强'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.SkillEnhence}
                                            name="SkillEnhence"
                                            error={touched.SkillEnhence && Boolean(errors.SkillEnhence)}  
                                            helperText={errors.SkillEnhence}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='闪避'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Dodge}
                                            name="Dodge"
                                            error={touched.Dodge && Boolean(errors.Dodge)}  
                                            helperText={errors.Dodge}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>}

                                {inputPanelContent === 'Extra' && 
                                    <CustomTextArea  
                                        placeholder='其他属性'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        value={values.OtherAttribute}
                                        name="OtherAttribute"
                                        error={touched.OtherAttribute && Boolean(errors.OtherAttribute)}  
                                        helperText={errors.OtherAttribute}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />}

                                {inputPanelContent === 'Alt' && 
                                    <CustomTextArea  
                                        placeholder='Alt额外信息'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        value={values.ItemExtraInfo}
                                        name="ItemExtraInfo"
                                        error={touched.ItemExtraInfo && Boolean(errors.ItemExtraInfo)}  
                                        helperText={errors.ItemExtraInfo}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />}

                                {inputPanelContent === 'ExtraDescription' && 
                                    <CustomTextArea  
                                        placeholder='其他信息'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        value={values.ItemDescription}
                                        name="ItemDescription"
                                        error={touched.ItemDescription && Boolean(errors.ItemDescription)}  
                                        helperText={errors.ItemDescription}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />}

                                {inputPanelContent === 'Background' && 
                                    <CustomTextArea  
                                        placeholder='背景故事'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        value={values.ItemBackground}
                                        name="ItemBackground"
                                        error={touched.ItemBackground && Boolean(errors.ItemBackground)}  
                                        helperText={errors.ItemBackground}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />}
                            </InputPanel>}

                            物品信息
                            <div className='ExistedItemPart4Display'>
                                <div className='ItemInfoTitle'>
                                    <div className='ItemInfoTitleImage'>
                                        <img src='http://localhost:3001/assets/items/Shivas_Guard_icon.webp' style={{width: '100%', border:'1px solid black'}}/>
                                    </div>
                                    <div className='ItemInfoTitleName' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('ItemName')}}>
                                        <div className='ItemInfoTitleCNName'>
                                            {values.ItemCNName ? values.ItemCNName : '装备名称'}
                                        </div>
                                        <div>
                                            {values.ItemType ? values.ItemType : '装备类型'}
                                        </div>
                                        <div className='ItemInfoTitlePrice'>
                                            {values.ItemPrice ? values.ItemPrice : '价格'}
                                        </div>
                                    </div>
                                    <div className='ItemInfoSubmitButton'>
                                        <button className='ItemInfoSubmitButtonBox' type='submit'>
                                            提交信息
                                        </button>
                                    </div>
                                </div>
                                <div className='ItemInfoStatistic'>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('HealthMana')}}>
                                        <div>
                                            +{values.Health}生命值
                                        </div>
                                        <div>
                                            +{values.Mana}魔法值
                                        </div>
                                        <div>
                                            +{values.HealthRecover}生命回复
                                        </div>
                                        <div>
                                            +{values.ManaRecover}魔法回复
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Attribute')}}>
                                        <div>
                                            +{values.Strength}力量
                                        </div>
                                        <div>
                                            +{values.Agility}敏捷
                                        </div>
                                        <div>
                                            +{values.Intelligence}智力
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Attack')}}>
                                        <div>
                                            +{values.Damage}攻击力
                                        </div>
                                        <div>
                                            +{values.AttackSpeed}攻击速度
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Defence')}}>
                                        <div>
                                            +{values.Armor}护甲
                                        </div>
                                        <div>
                                            +{values.MagicResist}%魔抗
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Move')}}>
                                        <div>
                                            +{values.Movespeed}移动速度
                                        </div>
                                        <div>
                                            +{values.MovespeedPercentage}%移动速度
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Other')}}>
                                        <div>
                                            +{values.HealthSteal}%吸血
                                        </div>
                                        <div>
                                            +{values.SkillHealthSteal}%法术吸血
                                        </div>
                                        <div>
                                            +{values.SkillEnhence}%技能增强
                                        </div>
                                        <div>
                                            +{values.Dodge}%闪避
                                        </div>
                                    </div>
                                    <div className='ItemInfoDisplay' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Extra')}}>
                                        {values.OtherAttribute ? values.OtherAttribute.split('?').map((item, index) => <div key={index}>{item}</div>) : '其他属性'}
                                    </div>

                                    <div className='ItemInfoExtraInfo' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Alt')}}>
                                        {values.ItemExtraInfo ? values.ItemExtraInfo.split('?').map((item, index) => <div key={index}>{item}</div>) : 'Alt额外信息'}
                                    </div>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('ExtraDescription')}}>
                                        {values.ItemDescription ? values.ItemDescription.split('?').map((item, index) => <div key={index}>{item}</div>) : '其他信息'}
                                    </div>
                                    <div className='ItemInfoBackground' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Background')}}>
                                        {values.ItemBackground ? values.ItemBackground : '背景故事'}
                                    </div>
                                </div>

                            </div>
                        </form>)}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default ExistedItem;