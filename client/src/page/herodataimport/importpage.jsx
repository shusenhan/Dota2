import { Button, FormControl, IconButton, InputLabel, MenuItem } from '@mui/material';  
import { Formik } from "formik";
import * as yup from "yup";
import './importpage.css'
import CustomTextField from "../../component/MytTextField";
import CustomSelect from '../../component/MySelect';
import MyImage from '../../component/Image';
import notify from '../../component/ToastBox.tsx';

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
    HeroCNName: '',
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
    InitHealth: 0,
    InitHealthRecover: 0,
    InitMana: 0,
    InitManaRecover: 0,
    InitArmor: 0,
    InitMagicResist: 25,
    DamageMin: 0,
    DamageMax: 0,
    AttackType: 0,
    AttackRange: 0,
    InitAttackSpeed: 0,
    AttackRate: 0,
    AttackAnimation1: 0,
    AttackAnimation2: 0,
    ProjectileSpeed: 0,
    MoveSpeed: 0,
    TurnRate: 0,
    DayVision: 1800,
    NightVision: 800,
};

const HeroDataImportPage = () => {
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
        }
        else{
            notify('error', result.message);
        }
    };

    return(
        <div className="HeroImportPageContent">
            <div className="HeroImportPageBox2">
                <div
                    style={{
                        fontWeight: 500,
                        fontSize: '20px',
                        color: '#F9BA1A'
                    }}
                >
                    英雄信息录入
                </div>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initValue}
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
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                display: 'grid',
                                gap:'30px',
                                gridTemplateColumns:'repeat(4, minmax(0, 1fr))',
                                '& > div': {
                                    gridColumn: 'span 4'
                                },
                            }}>
                                <CustomTextField  
                                    label='名称'  
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

                                <CustomTextField  
                                    label='中文名称'  
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
                                </FormControl>

                                <CustomTextField  
                                    label='头像'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.Image1}
                                    name="Image1"
                                    error={touched.Image1 && Boolean(errors.Image1)}  
                                    helperText={errors.Image1}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
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
                                <CustomTextField  
                                    label='初始生命值'  
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
                                    label='初始生命回复'  
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
                                <CustomTextField  
                                    label='初始魔法值'  
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
                                    label='初始魔法回复'  
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
                                />
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
                                />
                                <CustomTextField  
                                    label='初始攻击下限'  
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
                                    label='初始攻击上限'  
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
                                        <MenuItem value={0}>近战</MenuItem>
                                        <MenuItem value={1}>远程</MenuItem>
                                    </CustomSelect>
                                </FormControl>

                                <CustomTextField  
                                    label='攻击范围'  
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
                                />
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
                                />
                                <CustomTextField  
                                    label='攻击动画前摇'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.AttackAnimation1}
                                    name="AttackAnimation1"
                                    error={touched.AttackAnimation1 && Boolean(errors.AttackAnimation1)}  
                                    helperText={errors.AttackAnimation1}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='攻击动画后摇'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.AttackAnimation2}
                                    name="AttackAnimation2"
                                    error={touched.AttackAnimation2 && Boolean(errors.AttackAnimation2)}  
                                    helperText={errors.AttackAnimation2}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />
                                <CustomTextField  
                                    label='攻击投射物速度'  
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
                                />
                                <CustomTextField  
                                    label='移动速度'  
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
                                />
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
                                />
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
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    // onClick={() => {console.log(values)}}
                                    sx={{
                                        m:"2rem 0",
                                        p:"1rem",
                                        backgroundColor: 'yellow',
                                        color: 'green',
                                        "&:hover": {color: 'blue'}
                                    }}  
                                >
                                    提交信息
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default HeroDataImportPage;