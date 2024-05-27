import { 
    Box, 
    Button, 
    FormControl, 
    Checkbox, 
    InputLabel, 
    MenuItem,
    FormGroup,
    FormControlLabel
} from '@mui/material';  
import { Formik } from "formik";
import * as yup from "yup";
import './importpage.css'
import CustomTextField from "../../component/MytTextField";
import CustomSelect from '../../component/MySelect';
import MyImage from '../../component/Image';
import notify from '../../component/ToastBox.tsx';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InputPanel from './InputPanel.jsx';

const heroSchema = yup.object().shape({
    HeroName: yup.string().required('请输入值'),
    HeroCNName: yup.string().required('请输入值'),
    HeroType: yup.number().required('请输入值'),
    Image1: yup.string(),
    Image2: yup.string(),
    Image3: yup.string(),
    InitStrength: yup.number().required('请输入值').typeError('请输入数字'),
    StrengthGrowth: yup.number().required('请输入值').typeError('请输入数字'),
    InitAgility: yup.number().required('请输入值').typeError('请输入数字'),
    AgilityGrowth: yup.number().required('请输入值').typeError('请输入数字'),
    InitIntelligence: yup.number().required('请输入值').typeError('请输入数字'),
    IntelligenceGrowth: yup.number().required('请输入值').typeError('请输入数字'),
    InitHealth: yup.number().required('请输入值').typeError('请输入数字'),
    InitHealthRecover: yup.number().required('请输入值').typeError('请输入数字'),
    InitMana: yup.number().required('请输入值').typeError('请输入数字'),
    InitManaRecover: yup.number().required('请输入值').typeError('请输入数字'),
    InitArmor: yup.number().required('请输入值').typeError('请输入数字'),
    InitMagicResist: yup.number().required('请输入值').typeError('请输入数字'),
    DamageMin: yup.number().required('请输入值').typeError('请输入数字'),
    DamageMax: yup.number().required('请输入值').typeError('请输入数字'),
    AttackType: yup.number().required('请输入值'),
    AttackRange: yup.number().required('请输入值').typeError('请输入数字'),
    InitAttackSpeed: yup.number().required('请输入值').typeError('请输入数字'),
    AttackRate: yup.number().required('请输入值').typeError('请输入数字'),
    AttackAnimation1: yup.number().required('请输入值').typeError('请输入数字'),
    AttackAnimation2: yup.number().required('请输入值').typeError('请输入数字'),
    ProjectileSpeed: yup.number().required('请输入值').typeError('请输入数字'),
    MoveSpeed: yup.number().required('请输入值').typeError('请输入数字'),
    TurnRate: yup.number().required('请输入值').typeError('请输入数字'),
    DayVision: yup.number().required('请输入值').typeError('请输入数字'),
    NightVision: yup.number().required('请输入值').typeError('请输入数字'),
});

const initValue = {
    HeroName: '',
    HeroCNName: '英雄名称',
    HeroType: 0,
    Image1: '',
    Image2: '',
    Image3: '',
    InitStrength: 0,
    StrengthGrowth: 0,
    InitAgility: 0,
    AgilityGrowth: 0,
    InitIntelligence: 0,
    IntelligenceGrowth: 0,
    InitHealth: 80,
    InitHealthRecover: 0,
    InitMana: 75,
    InitManaRecover: 0,
    InitArmor: 0,
    InitMagicResist: 25,
    DamageMin: 0,
    DamageMax: 0,
    AttackType: 0,
    AttackRange: 150,
    InitAttackSpeed: 100,
    AttackRate: 1.7,
    AttackAnimation1: 0.3,
    AttackAnimation2: 0.3,
    ProjectileSpeed: 9999,
    MoveSpeed: 0,
    TurnRate: 0.6,
    DayVision: 1800,
    NightVision: 800,
};

const HeroDataImportPage = () => {
    let [searchParams] = useSearchParams();  
    let heroName = searchParams.get('heroName');
    const [hero, setHeroData] = useState(null);
    const [heroPageType, setHeroPageType] = useState('简介');
    const [openInputPanel, setOpenInputPanel] = useState(false);
    const [inputPanelContent, setInputPanelContent] = useState('');

    const GetHeroData = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/hero/gethero/${heroName}`, 
            { 
                method: "GET",
            }
        )

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setHeroData(result.data);
        }
    }

    useEffect(() => {
        if(heroName){
            GetHeroData();
        }
    }, []);

    const handleFormSubmit = async (values, onSubmitProps) => {
        const serverResponse = await fetch(
            "http://localhost:3001/hero/insert",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(values)
            }
        );

        const result = await serverResponse.json();
        
        if(serverResponse.status === 200){
            notify('success', result.message);
            if(!heroName){
                onSubmitProps.resetForm();
            }
        }
        else{
            notify('error', result.message);
        }
    };

    const GetAttributeIcon = (HeroType) => {
        if(HeroType === 0){
            return 'http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'
        }
        else if(HeroType === 1){
            return 'http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'
        }
        else if(HeroType === 2){
            return 'http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'
        }
        else if(HeroType === 3){
            return 'http://localhost:3001/assets/commons/Universal_attribute_symbol.webp'
        }
    }

    const RenderInputPanel = ({ Component, props }) => {
        let Component1 = null;
        let Component2 = null;
        let Component3 = null;

        if(Component.length > 1){
            Component1 = Component[0];
            Component2 = Component[1];
            Component3 = Component[2];

            return(
                <Component3 {...props[2]}>
                    <Component1 {...props[0]}/>
                    <Component2 {...props[1]}/>
                </Component3>
            )
        }
        else{
            Component1 = Component[0];
            return(
                <Component1 {...props[0]}/>
            )
        }
    }

    return(hero && (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={hero ? hero : initValue}
            validationSchema={heroSchema}
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
            <div className="HeroImportPageContent">
                { openInputPanel &&
                    <InputPanel switcher={setOpenInputPanel}>
                        {inputPanelContent === 'HeroName' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='英雄名称'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.HeroCNName}
                                    name="HeroCNName"
                                    error={touched.HeroCNName && Boolean(errors.HeroCNName)}  
                                    helperText={errors.HeroCNName}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='英雄英文名称'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.HeroName}
                                    name="HeroName"
                                    error={touched.HeroName && Boolean(errors.HeroName)}  
                                    helperText={errors.HeroName}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'HeroType' && 
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="HeroType">主属性</InputLabel>
                                <CustomSelect
                                    labelId="HeroType"
                                    label="HeroType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.HeroType}
                                    defaultValue={0}
                                    name="HeroType"
                                    error={Boolean(touched.HeroType) && Boolean(errors.HeroType)}
                                    helperText={touched.HeroType && errors.HeroType}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                }}>
                                    <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>力量
                                        <MyImage width='16px' height='16px' src="http://localhost:3001/assets/commons/Strength_attribute_symbol.webp"/>
                                    </MenuItem>
                                    <MenuItem value={1}>敏捷
                                        <MyImage width='16px' height='16px' src="http://localhost:3001/assets/commons/Agility_attribute_symbol.webp"/>
                                    </MenuItem>
                                    <MenuItem value={2}>智力
                                        <MyImage width='16px' height='16px' src="http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp"/>
                                    </MenuItem>
                                    <MenuItem value={3}>全才
                                        <MyImage width='16px' height='16px' src="http://localhost:3001/assets/commons/Universal_attribute_symbol.webp"/>
                                    </MenuItem>
                                </CustomSelect>
                            </FormControl>}

                        {inputPanelContent === 'Complexity' && 
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="Complexity">操作复杂度</InputLabel>
                                <CustomSelect
                                    labelId="Complexity"
                                    label="Complexity"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.Complexity}
                                    defaultValue={1}
                                    name="Complexity"
                                    error={Boolean(touched.Complexity) && Boolean(errors.Complexity)}
                                    helperText={touched.Complexity && errors.Complexity}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                }}>
                                    <MenuItem value={1} style={{ display: 'flex', alignItems: 'center' }}>简单
                                    </MenuItem>
                                    <MenuItem value={2}>中等
                                    </MenuItem>
                                    <MenuItem value={3}>复杂
                                    </MenuItem>
                                </CustomSelect>
                            </FormControl>}

                        {inputPanelContent === 'AttackType' && 
                            <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                <InputLabel id="AttackType">攻击类型</InputLabel>
                                <CustomSelect
                                    labelId="AttackType"
                                    label="AttackType"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.AttackType}
                                    defaultValue={0}
                                    name="AttackType"
                                    error={Boolean(touched.AttackType) && Boolean(errors.AttackType)}
                                    helperText={touched.AttackType && errors.AttackType}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                }}>
                                    <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>近战
                                    </MenuItem>
                                    <MenuItem value={1}>远程
                                    </MenuItem>
                                </CustomSelect>
                            </FormControl>}

                        {inputPanelContent === 'Role' && 
                            <div>
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="控制" />
                                    <FormControlLabel control={<Checkbox />} label="肉盾" />
                                    <FormControlLabel control={<Checkbox />} label="逃生" />
                                    <FormControlLabel control={<Checkbox />} label="先手" />
                                    <FormControlLabel control={<Checkbox />} label="爆发" />
                                    <FormControlLabel control={<Checkbox />} label="推进" />
                                </FormGroup>
                            </div>}

                        {inputPanelContent === 'Strength' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='初始力量'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitStrength}
                                    name="InitStrength"
                                    error={touched.InitStrength && Boolean(errors.InitStrength)}  
                                    helperText={errors.InitStrength}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='力量成长'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.StrengthGrowth}
                                    name="StrengthGrowth"
                                    error={touched.StrengthGrowth && Boolean(errors.StrengthGrowth)}  
                                    helperText={errors.StrengthGrowth}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Agility' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='初始敏捷'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitAgility}
                                    name="InitAgility"
                                    error={touched.InitAgility && Boolean(errors.InitAgility)}  
                                    helperText={errors.InitAgility}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='敏捷成长'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.AgilityGrowth}
                                    name="AgilityGrowth"
                                    error={touched.AgilityGrowth && Boolean(errors.AgilityGrowth)}  
                                    helperText={errors.AgilityGrowth}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Intelligence' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='初始智力'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitIntelligence}
                                    name="InitIntelligence"
                                    error={touched.InitIntelligence && Boolean(errors.InitIntelligence)}  
                                    helperText={errors.InitIntelligence}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='智力成长'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.IntelligenceGrowth}
                                    name="IntelligenceGrowth"
                                    error={touched.IntelligenceGrowth && Boolean(errors.IntelligenceGrowth)}  
                                    helperText={errors.IntelligenceGrowth}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Health' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='基础生命值'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitHealth}
                                    name="InitHealth"
                                    error={touched.InitHealth && Boolean(errors.InitHealth)}  
                                    helperText={errors.InitHealth}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='基础生命回复'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitHealthRecover}
                                    name="InitHealthRecover"
                                    error={touched.InitHealthRecover && Boolean(errors.InitHealthRecover)}  
                                    helperText={errors.InitHealthRecover}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Mana' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='基础魔法值'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitMana}
                                    name="InitMana"
                                    error={touched.InitMana && Boolean(errors.InitMana)}  
                                    helperText={errors.InitMana}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='基础魔法值回复'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.InitManaRecover}
                                    name="InitManaRecover"
                                    error={touched.InitManaRecover && Boolean(errors.InitManaRecover)}  
                                    helperText={errors.InitManaRecover}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Damage' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='初始攻击力下限'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.DamageMin}
                                    name="DamageMin"
                                    error={touched.DamageMin && Boolean(errors.DamageMin)}  
                                    helperText={errors.DamageMin}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='初始攻击力上限'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.DamageMax}
                                    name="DamageMax"
                                    error={touched.DamageMax && Boolean(errors.DamageMax)}  
                                    helperText={errors.DamageMax}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'AttackSpeed' && 
                            <CustomTextField  
                                label='初始攻击速度'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.InitAttackSpeed}
                                name="InitAttackSpeed"
                                error={touched.InitAttackSpeed && Boolean(errors.InitAttackSpeed)}  
                                helperText={errors.InitAttackSpeed}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'AttackRate' && 
                            <CustomTextField  
                                label='攻击间隔'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.AttackRate}
                                name="AttackRate"
                                error={touched.AttackRate && Boolean(errors.AttackRate)}  
                                helperText={errors.AttackRate}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'AttackRange' && 
                            <CustomTextField  
                                label='攻击距离'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.AttackRange}
                                name="AttackRange"
                                error={touched.AttackRange && Boolean(errors.AttackRange)}  
                                helperText={errors.AttackRange}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'ProjectileSpeed' && 
                            <CustomTextField  
                                label='弹道速度'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.ProjectileSpeed}
                                name="ProjectileSpeed"
                                error={touched.ProjectileSpeed && Boolean(errors.ProjectileSpeed)}  
                                helperText={errors.ProjectileSpeed}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'Vision' && 
                            <div style={{
                                display: 'grid', 
                                gap: '15%', 
                                width: '100%', 
                                height:'100%',
                                margin: '5%'
                            }}>
                                <CustomTextField  
                                    label='白天视野'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.DayVision}
                                    name="DayVision"
                                    error={touched.DayVision && Boolean(errors.DayVision)}  
                                    helperText={errors.DayVision}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='夜晚视野'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.NightVision}
                                    name="NightVision"
                                    error={touched.NightVision && Boolean(errors.NightVision)}  
                                    helperText={errors.NightVision}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                            </div>}

                        {inputPanelContent === 'Armor' && 
                            <CustomTextField  
                                label='初始护甲'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.InitArmor}
                                name="InitArmor"
                                error={touched.InitArmor && Boolean(errors.InitArmor)}  
                                helperText={errors.InitArmor}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'MagicResist' && 
                            <CustomTextField  
                                label='初始魔抗'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.InitMagicResist}
                                name="InitMagicResist"
                                error={touched.InitMagicResist && Boolean(errors.InitMagicResist)}  
                                helperText={errors.InitMagicResist}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'MoveSpeed' && 
                            <CustomTextField  
                                label='基础移动速度'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.MoveSpeed}
                                name="MoveSpeed"
                                error={touched.MoveSpeed && Boolean(errors.MoveSpeed)}  
                                helperText={errors.MoveSpeed}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}

                        {inputPanelContent === 'TurnRate' && 
                            <CustomTextField  
                                label='转身速率'  
                                onBlur={handleBlur}  
                                onChange={handleChange}  
                                value={values.TurnRate}
                                name="TurnRate"
                                error={touched.TurnRate && Boolean(errors.TurnRate)}  
                                helperText={errors.TurnRate}
                                style={{  
                                    gridColumn: "span 2",  
                                    display: 'flex',  
                                    alignItems: 'center',
                                }}  
                                size="small"  
                            />}
                    </InputPanel>
                }

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

                <div className='HeroImportPageLeft'>
                    <div className='HeroPageHeroName'
                        onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('HeroName')}}
                        style={{
                            height: '18%',
                            width: '50%',
                            fontSize: '5.5vh',
                            display: 'flex',
                    }}>
                        {values.HeroCNName}
                    </div>
                    <div style={{
                        height: '8%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        width: '100%',
                    }}>
                        <div className='HeroImportPageAttributeIcon' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('HeroType')}}>
                            <img src={hero ? GetAttributeIcon(values.HeroType) : 'http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'}/>
                        </div>
                        <div className='HeroImportPageComplexity' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Complexity')}}>
                            <img src="http://localhost:3001/assets/commons/Filter_complexity_icon.webp"/>
                            <img src="http://localhost:3001/assets/commons/Filter_complexity_icon.webp"/>
                            <img src="http://localhost:3001/assets/commons/Filter_complexity_icon.webp"/>
                        </div>
                        <div className='HeroImportPageAttackType' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('AttackType')}}>
                            攻击类型：
                            {hero ? 
                                (values.AttackType === 0 ? 
                                    <img src="http://localhost:3001/assets/commons/Melee_icon.webp"/> : 
                                    <img src="http://localhost:3001/assets/commons/Ranged_icon.webp"/>) : 
                                <img src="http://localhost:3001/assets/commons/Melee_icon.webp"/>}
                        </div>
                        <div className='HeroImportPageRole' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Role')}}>
                            标签：
                            <img src='http://localhost:3001/assets/commons/Filter_disabler_icon.webp'/>
                            <img src='http://localhost:3001/assets/commons/Filter_durable_icon.webp'/>
                            <img src='http://localhost:3001/assets/commons/Filter_escape_icon.webp'/>
                            <img src='http://localhost:3001/assets/commons/Filter_initiator_icon.webp'/>
                            <img src='http://localhost:3001/assets/commons/Filter_nuker_icon.webp'/>
                            {/* <img src='http://localhost:3001/assets/commons/Filter_pusher_icon.webp'/> */}
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
                        <div className='HeroImportPageInitTalent1'>
                            命石1
                        </div>
                        <div className='HeroImportPageInitTalent2'>
                            命石2
                        </div>
                    </div>
                    <div style={{
                        height: '13%',
                        fontSize: '100%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                    }}>
                        <div className='HeroImportPageTalentTree'>
                            <div></div>
                            <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg'/>
                        </div>

                        <div className='HeroImportPageInitSkill'>
                            <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg'/>
                        </div>

                        {/* 用map打印出来 */}
                        <div className='HeroImportPageSkill'>
                            1
                        </div>

                        <div className='HeroImportPageSkill'>
                            2
                        </div>

                        <div className='HeroImportPageSkill'>
                            3
                        </div>

                        <div className='HeroImportPageSkill'>
                            4
                        </div>

                        <div className='HeroImportPageSkill'>
                            5
                        </div>

                        <div className='HeroImportPageSkill'>
                            6
                        </div>
                    </div>
                    <div className='HeroImportPageDataPanel'>
                        <div className='HeroImportPageAttributePanel1'>
                            <div className='HeroImportPageAttributeName1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Strength')}}>
                                力量
                            </div>
                            <div className='HeroImportPageAttributeData1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Strength')}}>
                                <img src='http://localhost:3001/assets/commons/Strength_attribute_symbol.webp'/>
                                {values.InitStrength}+{values.StrengthGrowth}
                            </div>
                            <div className='HeroImportPageAttributeName1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Agility')}}>
                                敏捷
                            </div>
                            <div className='HeroImportPageAttributeData1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Agility')}}>
                                <img src='http://localhost:3001/assets/commons/Agility_attribute_symbol.webp'/>
                                {values.InitAgility}+{values.AgilityGrowth}
                            </div>
                            <div className='HeroImportPageAttributeName1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Intelligence')}}>
                                智力
                            </div>
                            <div className='HeroImportPageAttributeData1' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Intelligence')}}>
                                <img src='http://localhost:3001/assets/commons/Intelligence_attribute_symbol.webp'/>
                                {values.InitIntelligence}+{values.IntelligenceGrowth}
                            </div>

                        </div>
                        <div className='HeroImportPageAttributePanel2'>
                            <div className='HeroImportPageHealthManaPanel'>
                                <div className='HeroImportPageHealth' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Health')}}>
                                    初始生命值：
                                    <div className='HeroImportPageHealthBar'>
                                        {values.InitHealth} + {values.InitHealthRecover}
                                    </div>
                                </div>

                                <div className='HeroImportPageMana' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Mana')}}>
                                    初始魔法值：
                                    <div className='HeroImportPageManaBar'>
                                        {values.InitMana} + {values.InitManaRecover}
                                    </div>
                                </div>
                            </div>
                            <div className='HeroImportPageOtherAttribute'>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'30%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Damage')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_damage.png'/>
                                    <div>
                                        {values.DamageMin}-{values.DamageMax}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('AttackSpeed')}}>
                                    攻速
                                    <div>
                                        {values.InitAttackSpeed}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('AttackRate')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_attack_time.png'/>
                                    <div>
                                        {values.AttackRate}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('AttackRange')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_attack_range.png'/>
                                    <div>
                                        {values.AttackRange}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('ProjectileSpeed')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_projectile_speed.png'/>
                                    <div>
                                        {values.ProjectileSpeed}
                                    </div>
                                </div>
                            </div>

                            <div className='HeroImportPageExtraAttribute'>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'30%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Vision')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_vision.png'/>
                                    <div>
                                        {values.DayVision}/{values.NightVision}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Armor')}}>
                                    <img src='http://localhost:3001/assets/commons/icon_armor.png'/>
                                    <div>
                                        {values.InitArmor}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('MagicResist')}}>
                                    <img src='http://localhost:3001/assets/commons/Magic_Resistance_icon.webp'/>
                                    <div>
                                        {values.InitMagicResist}%
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('MoveSpeed')}}>
                                    <img src='http://localhost:3001/assets/commons/Movement_speed_icon.webp'/>
                                    <div>
                                        {values.MoveSpeed}
                                    </div>
                                </div>
                                <div className='HeroImportPageAttributeData2' style={{flexBasis:'17.5%'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('TurnRate')}}>
                                    <img src='http://localhost:3001/assets/commons/Turn_rate_icon.webp'/>
                                    <div>
                                        {values.TurnRate}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='HeroImportPageMiddle'>
                
                </div>
                <div className='HeroImportPageRight'>
                    
                </div>
            </div>)}
        </Formik>)
    )
}

export default HeroDataImportPage;