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
import Talents from '../../component/Talents/Talents.jsx';
import CustomTextArea from '../../component/MyTextArea.jsx';

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
    Complixity: yup.number().required('请输入值').typeError('请输入数字'),
    IsDisable: yup.number().required('请输入值').typeError('请输入数字'),
    IsDurable: yup.number().required('请输入值').typeError('请输入数字'),
    IsEscape: yup.number().required('请输入值').typeError('请输入数字'),

    IsInitiator: yup.number().required('请输入值').typeError('请输入数字'),
    IsNuker: yup.number().required('请输入值').typeError('请输入数字'),
    IsPusher: yup.number().required('请输入值').typeError('请输入数字'),

    EffectOwner: yup.string().required('请输入值'),
    AffectSkill1: yup.string(),
    Description1: yup.string(),
    IsNewSkill1: yup.number(),
    IsShard1: yup.number(),
    ExtraInfo1: yup.string(),
    AffectSkill2: yup.string(),
    Description2: yup.string(),
    IsNewSkill2: yup.number(),
    IsShard2: yup.number(),
    ExtraInfo2: yup.string(),
    AffectSkill3: yup.string(),
    Description3: yup.string(),
    IsNewSkill3: yup.number(),
    IsShard3: yup.number(),
    ExtraInfo3: yup.string(),
    AffectSkill4: yup.string(),
    Description4: yup.string(),
    IsNewSkill4: yup.number(),
    IsShard4: yup.number(),
    ExtraInfo4: yup.string(),
});

const initHero = {
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
    Complixity: 1,
    IsDisable: 0,
    IsDurable: 0,
    IsEscape: 0,
    IsInitiator: 0,
    IsNuker: 0,
    IsPusher: 0
};

const initAghanim = {
    EffectOwner: '',
    AffectSkill1: '',
    Description1: '',
    IsNewSkill1: 0,
    IsShard1: 0,
    ExtraInfo1: '',
    AffectSkill2: '',
    Description2: '',
    IsNewSkill2: 0,
    IsShard2: 0,
    ExtraInfo2: '',
    AffectSkill3: '',
    Description3: '',
    IsNewSkill3: 0,
    IsShard3: 0,
    ExtraInfo3: '',
    AffectSkill4: '',
    Description4: '',
    IsNewSkill4: 0,
    IsShard4: 0,
    ExtraInfo4: '',
}

const info1 = [
    'HeroName',
    'HeroCNName',
    'HeroType',
    'Image1',
    'Image2',
    'Image3',
    'InitStrength',
    'StrengthGrowth',
    'InitAgility',
    'AgilityGrowth',
    'InitIntelligence',
    'IntelligenceGrowth',
    'InitHealth',
    'InitHealthRecover',
    'InitMana',
    'InitManaRecover',
    'InitArmor',
    'InitMagicResist',
    'DamageMin',
    'DamageMax',
    'AttackType',
    'AttackRange',
    'InitAttackSpeed',
    'AttackRate',
    'AttackAnimation1',
    'AttackAnimation2',
    'ProjectileSpeed',
    'MoveSpeed',
    'TurnRate',
    'DayVision',
    'NightVision',
    'Complixity',
    'IsDisable',
    'IsDurable',
    'IsEscape',
    'IsInitiator',
    'IsNuker',
    'IsPusher'
];

const info2 = [
    'EffectOwner',
    'AffectSkill1',
    'Description1',
    'IsNewSkill1',
    'IsShard1',
    'ExtraInfo1',
    'AffectSkill2',
    'Description2',
    'IsNewSkill2',
    'IsShard2',
    'ExtraInfo2',
    'AffectSkill3',
    'Description3',
    'IsNewSkill3',
    'IsShard3',
    'ExtraInfo3',
    'AffectSkill4',
    'Description4',
    'IsNewSkill4',
    'IsShard4',
    'ExtraInfo4',
];

const HeroDataImportPage = () => {
    let [searchParams] = useSearchParams();  
    let heroName = searchParams.get('heroName');
    const [hero, setHeroData] = useState(null);
    const [heroPageType, setHeroPageType] = useState('简介');
    const [openInputPanel, setOpenInputPanel] = useState(false);
    const [inputPanelContent, setInputPanelContent] = useState('');
    const [aghanim, setAghanim] = useState(null);
    const [initValue, setInitValue] = useState(null);

    const GetHeroData = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/hero/gethero/${heroName}`, 
            { 
                method: "GET",
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setHeroData(result.data);
        }
    };

    const GetAghanimData = async () => {

        const serverResponse = await fetch(
            `http://localhost:3001/aghanim/getaghanim/${heroName}`, 
            { 
                method: "GET",
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            setAghanim(result.data[0]);
        }
    };

    useEffect(() => {
        if(heroName){
            GetHeroData();
            GetAghanimData();
        }
    }, []);

    const SubmitHero = async (values, onSubmitProps) => {

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

    const SubmitAghanim = async (values, onSubmitProps) => {
        const serverResponse = await fetch(
            "http://localhost:3001/aghanim/insert",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(values)
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
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await SubmitAghanim(values, onSubmitProps);
        await SubmitHero(values, onSubmitProps);
    }

    const FormDataInitialize = () => {
        if(hero && aghanim){
            setInitValue({...hero, ...aghanim})
        }
        else if(hero && !aghanim){
            setInitValue({...hero, ...initAghanim})
        }
        else if(!hero && aghanim){
            setInitValue({...initHero, ...aghanim})
        }
        else if(!hero && !aghanim){
            setInitValue({...initHero, ...initAghanim})
        }
    }

    useEffect(() => {
        FormDataInitialize();
    }, [hero,aghanim]);

    return(initValue && (
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={initValue}
            validationSchema={heroSchema}
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
            <form onSubmit={handleSubmit} style={{height: '100%', width: '100%'}}>
                {console.log(initValue)}
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

                            {inputPanelContent === 'Complixity' && 
                                <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                    <InputLabel id="Complixity">操作复杂度</InputLabel>
                                    <CustomSelect
                                        labelId="Complixity"
                                        label="Complixity"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Complixity}
                                        defaultValue={1}
                                        name="Complixity"
                                        error={Boolean(touched.Complixity) && Boolean(errors.Complixity)}
                                        helperText={touched.Complixity && errors.Complixity}
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
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsDisable === 1} 
                                                onChange={() => {
                                                    if(values.IsDisable === 1){
                                                        setFieldValue('IsDisable', 0)
                                                    }
                                                    else if(values.IsDisable === 0){
                                                        setFieldValue('IsDisable', 1)
                                                    }
                                        }}/>} label="控制" />
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsDurable === 1} 
                                                onChange={() => {
                                                    if(values.IsDurable === 1){
                                                        setFieldValue('IsDurable', 0)
                                                    }
                                                    else if(values.IsDurable === 0){
                                                        setFieldValue('IsDurable', 1)
                                                    }
                                        }}/>} label="肉盾" />
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsEscape === 1} 
                                                onChange={() => {
                                                    if(values.IsEscape === 1){
                                                        setFieldValue('IsEscape', 0)
                                                    }
                                                    else if(values.IsEscape === 0){
                                                        setFieldValue('IsEscape', 1)
                                                    }
                                        }}/>} label="逃生" />
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsInitiator === 1} 
                                                onChange={() => {
                                                    if(values.IsInitiator === 1){
                                                        setFieldValue('IsInitiator', 0)
                                                    }
                                                    else if(values.IsInitiator === 0){
                                                        setFieldValue('IsInitiator', 1)
                                                    }
                                        }}/>} label="先手" />
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsNuker === 1} 
                                                onChange={() => {
                                                    if(values.IsNuker === 1){
                                                        setFieldValue('IsNuker', 0)
                                                    }
                                                    else if(values.IsNuker === 0){
                                                        setFieldValue('IsNuker', 1)
                                                    }
                                        }}/>} label="爆发" />
                                        <FormControlLabel 
                                            control={<Checkbox
                                                checked={values.IsPusher === 1} 
                                                onChange={() => {
                                                    if(values.IsPusher === 1){
                                                        setFieldValue('IsPusher', 0)
                                                    }
                                                    else if(values.IsPusher === 0){
                                                        setFieldValue('IsPusher', 1)
                                                    }
                                        }}/>} label="推进" />
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

                            {inputPanelContent === 'Talent' &&  <div style={{width: '330px', height:'200px'}}><Talents/></div> }

                            {inputPanelContent === 'Aghanim' && 
                                <div style={{
                                    display: 'flex', 
                                    justifyContent:'space-between', 
                                    alignItems:'center',
                                    height: '50vh',
                                    width: '80vw',
                                }}>
                                    <div style={{
                                        width: '100%', 
                                        height:'100%',
                                        margin: '5%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4%'
                                    }}>
                                        <CustomTextField  
                                            label='拥有者'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.EffectOwner}
                                            name="EffectOwner"
                                            error={touched.EffectOwner && Boolean(errors.EffectOwner)}  
                                            helperText={errors.EffectOwner}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='关联技能1'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.AffectSkill1}
                                            name="AffectSkill1"
                                            error={touched.AffectSkill1 && Boolean(errors.AffectSkill1)}  
                                            helperText={errors.AffectSkill1}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='关联技能1描述'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Description1}
                                            name="Description1"
                                            error={touched.Description1 && Boolean(errors.Description1)}  
                                            helperText={errors.Description1}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsNewSkill1">是否是新技能</InputLabel>
                                            <CustomSelect
                                                labelId="IsNewSkill1"
                                                label="IsNewSkill1"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsNewSkill1}
                                                defaultValue={0}
                                                name="IsNewSkill1"
                                                error={Boolean(touched.IsNewSkill1) && Boolean(errors.IsNewSkill1)}
                                                helperText={touched.IsNewSkill1 && errors.IsNewSkill1}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>否
                                                </MenuItem>
                                                <MenuItem value={1}>是
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsShard1">阿哈利姆类型</InputLabel>
                                            <CustomSelect
                                                labelId="IsShard1"
                                                label="IsShard1"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsShard1}
                                                defaultValue={0}
                                                name="IsShard1"
                                                error={Boolean(touched.IsShard1) && Boolean(errors.IsShard1)}
                                                helperText={touched.IsShard1 && errors.IsShard1}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>神杖
                                                </MenuItem>
                                                <MenuItem value={1}>魔晶
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>

                                        <CustomTextArea  
                                            placeholder='数据面板'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ExtraInfo1}
                                            name="ExtraInfo1"
                                            error={touched.ExtraInfo1 && Boolean(errors.ExtraInfo1)}  
                                            helperText={errors.ExtraInfo1}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>

                                    <div style={{
                                        width: '100%', 
                                        height:'100%',
                                        margin: '5%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4%'
                                    }}>
                                        <CustomTextField  
                                            label='关联技能2'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.AffectSkill2}
                                            name="AffectSkill2"
                                            error={touched.AffectSkill2 && Boolean(errors.AffectSkill2)}  
                                            helperText={errors.AffectSkill2}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='关联技能2描述'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Description2}
                                            name="Description2"
                                            error={touched.Description2 && Boolean(errors.Description2)}  
                                            helperText={errors.Description2}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsNewSkill2">是否是新技能</InputLabel>
                                            <CustomSelect
                                                labelId="IsNewSkill2"
                                                label="IsNewSkill2"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsNewSkill2}
                                                defaultValue={0}
                                                name="IsNewSkill2"
                                                error={Boolean(touched.IsNewSkill2) && Boolean(errors.IsNewSkill2)}
                                                helperText={touched.IsNewSkill2 && errors.IsNewSkill2}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>否
                                                </MenuItem>
                                                <MenuItem value={1}>是
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsShard2">阿哈利姆类型</InputLabel>
                                            <CustomSelect
                                                labelId="IsShard2"
                                                label="IsShard2"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsShard2}
                                                defaultValue={0}
                                                name="IsShard2"
                                                error={Boolean(touched.IsShard2) && Boolean(errors.IsShard2)}
                                                helperText={touched.IsShard2 && errors.IsShard2}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>神杖
                                                </MenuItem>
                                                <MenuItem value={1}>魔晶
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <CustomTextArea  
                                            placeholder='数据面板'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ExtraInfo2}
                                            name="ExtraInfo2"
                                            error={touched.ExtraInfo2 && Boolean(errors.ExtraInfo2)}  
                                            helperText={errors.ExtraInfo2}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>

                                    <div style={{
                                        width: '100%', 
                                        height:'100%',
                                        margin: '5%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4%'
                                    }}>
                                        <CustomTextField  
                                            label='关联技能3'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.AffectSkill3}
                                            name="AffectSkill3"
                                            error={touched.AffectSkill3 && Boolean(errors.AffectSkill3)}  
                                            helperText={errors.AffectSkill3}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='关联技能3描述'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Description3}
                                            name="Description3"
                                            error={touched.Description3 && Boolean(errors.Description3)}  
                                            helperText={errors.Description3}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsNewSkill3">是否是新技能</InputLabel>
                                            <CustomSelect
                                                labelId="IsNewSkill3"
                                                label="IsNewSkill3"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsNewSkill3}
                                                defaultValue={0}
                                                name="IsNewSkill3"
                                                error={Boolean(touched.IsNewSkill3) && Boolean(errors.IsNewSkill3)}
                                                helperText={touched.IsNewSkill3 && errors.IsNewSkill3}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>否
                                                </MenuItem>
                                                <MenuItem value={1}>是
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsShard3">阿哈利姆类型</InputLabel>
                                            <CustomSelect
                                                labelId="IsShard3"
                                                label="IsShard3"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsShard3}
                                                defaultValue={0}
                                                name="IsShard3"
                                                error={Boolean(touched.IsShard3) && Boolean(errors.IsShard3)}
                                                helperText={touched.IsShard3 && errors.IsShard3}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>神杖
                                                </MenuItem>
                                                <MenuItem value={1}>魔晶
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <CustomTextArea  
                                            placeholder='数据面板'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ExtraInfo3}
                                            name="ExtraInfo3"
                                            error={touched.ExtraInfo3 && Boolean(errors.ExtraInfo3)}  
                                            helperText={errors.ExtraInfo3}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>

                                    <div style={{
                                        width: '100%', 
                                        height:'100%',
                                        margin: '5%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '4%'
                                    }}>
                                        <CustomTextField  
                                            label='关联技能4'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.AffectSkill4}
                                            name="AffectSkill4"
                                            error={touched.AffectSkill4 && Boolean(errors.AffectSkill4)}  
                                            helperText={errors.AffectSkill4}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='关联技能4描述'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Description4}
                                            name="Description4"
                                            error={touched.Description4 && Boolean(errors.Description4)}  
                                            helperText={errors.Description4}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsNewSkill4">是否是新技能</InputLabel>
                                            <CustomSelect
                                                labelId="IsNewSkill4"
                                                label="IsNewSkill4"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsNewSkill4}
                                                defaultValue={0}
                                                name="IsNewSkill4"
                                                error={Boolean(touched.IsNewSkill4) && Boolean(errors.IsNewSkill4)}
                                                helperText={touched.IsNewSkill4 && errors.IsNewSkill4}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>否
                                                </MenuItem>
                                                <MenuItem value={1}>是
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>
                                        <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsShard4">阿哈利姆类型</InputLabel>
                                            <CustomSelect
                                                labelId="IsShard4"
                                                label="IsShard4"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsShard4}
                                                defaultValue={0}
                                                name="IsShard1"
                                                error={Boolean(touched.IsShard4) && Boolean(errors.IsShard4)}
                                                helperText={touched.IsShard4 && errors.IsShard4}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>神杖
                                                </MenuItem>
                                                <MenuItem value={1}>魔晶
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>

                                        <CustomTextArea  
                                            placeholder='数据面板'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.ExtraInfo4}
                                            name="ExtraInfo4"
                                            error={touched.ExtraInfo4 && Boolean(errors.ExtraInfo4)}  
                                            helperText={errors.ExtraInfo4}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                    </div>
                                </div>}
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
                            <div className='HeroImportPageComplexity' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Complixity')}}>
                                { values.Complixity && Array.from({ length: values.Complixity }, (_, index) => (  
                                    <img key={index} src="http://localhost:3001/assets/commons/Filter_complexity_icon.webp" />  
                                ))}
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
                                {values.IsDisable === 1 && <img src='http://localhost:3001/assets/commons/Filter_disabler_icon.webp'/>}
                                {values.IsDurable === 1 && <img src='http://localhost:3001/assets/commons/Filter_durable_icon.webp'/>}
                                {values.IsEscape === 1 && <img src='http://localhost:3001/assets/commons/Filter_escape_icon.webp'/>}
                                {values.IsInitiator === 1 && <img src='http://localhost:3001/assets/commons/Filter_initiator_icon.webp'/>}
                                {values.IsNuker === 1 && <img src='http://localhost:3001/assets/commons/Filter_nuker_icon.webp'/>}
                                {values.IsPusher === 1 && <img src='http://localhost:3001/assets/commons/Filter_pusher_icon.webp'/>}
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
                            <div className='HeroImportPageTalentTree' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Talent')}}>
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
                            <div className='HeroImportPageTalentTree' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Aghanim')}}>
                                <div></div>
                                <img src='http://localhost:3001/assets/commons/Talent_tree_icon.svg'/>
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

                    <Box className='HeroImportPageSubmitButton'>
                        <Button 
                            type='submit'
                            onClick={() => {console.log(values);}} 
                            sx={{
                                color:'rgb(161, 161, 161)',
                                '&:hover': {
                                    color: 'rgb(210, 210, 210)',
                                }
                        }}>
                            提交应用信息
                        </Button>
                    </Box>
                </div>
            </form>)}
        </Formik>)
    )
}

export default HeroDataImportPage;