import './skillimportpage.css';
import { Button, FormControl, InputLabel, MenuItem, Box } from '@mui/material';  
import { Formik } from "formik";
import * as yup from "yup";
import notify from '../../component/ToastBox.tsx';
import InputPanel from '../herodataimport/InputPanel.jsx';
import { useEffect, useState } from 'react';
import CustomTextField from '../../component/MytTextField.jsx';
import Dropzone from "react-dropzone";
import CustomSelect from '../../component/MySelect.jsx';
import CustomTextArea from '../../component/MyTextArea.jsx';
import { useSearchParams } from 'react-router-dom';


const heroSchema = yup.object().shape({
    SkillName: yup.string().required('请输入值'),
    SkillCNName: yup.string().required('请输入值'),
    SkillDescription: yup.string().required('请输入值'),
    ImageFile1: yup.mixed(),
    Cost: yup.string().required('请输入值'),

    SkillCD: yup.string().required('请输入值'),
    Sequence: yup.number(),
    ExtraInfo1: yup.string(),
    ExtraInfo2: yup.string(),
    ExtraInfo3: yup.string(),

    Owner: yup.string().required('请输入值'),
    Affect: yup.string().required('请输入值'),
    InitTalent: yup.string(),
    InitTalentDescription: yup.string(),
    IgnoreBKB: yup.string().required('请输入值'),

    Dispellable: yup.string().required('请输入值'),
    DamageType: yup.string().required('请输入值'),
    Ability: yup.string().required('请输入值'),
    CastRange: yup.string().required('请输入值'),
    IsAghanim: yup.number().required('请输入值'),

    IsInitSkill: yup.number().required('请输入值'),
    SkillType: yup.number().required('请输入值'),
});

const initValue = {
    SkillName: '',
    SkillCNName: '',
    SkillDescription: '',
    ImageFile1: "",
    Cost: '',

    SkillCD: '',
    Sequence: 0,
    ExtraInfo1: '',
    ExtraInfo2: '',
    ExtraInfo3: '',

    Owner: '',
    Affect: '敌人',
    InitTalent: '',
    InitTalentDescription: '',
    IgnoreBKB: '不无视状态免疫',

    Dispellable: '可驱散',
    DamageType: '物理',
    Ability: '点目标',
    CastRange: '0',
    IsAghanim: 0,

    IsInitSkill: 0,
    SkillType: 0,
};

const SkillDataImportPage = () => {
    let [searchParams] = useSearchParams();  
    let heroName = searchParams.get('heroName');
    const [openInputPanel, setOpenInputPanel] = useState(false);
    const [inputPanelContent, setInputPanelContent] = useState('');
    const [heroSkill, setHeroSkill] = useState(null);
    const [currentSkill, setCurrentSkill] = useState(null);
    const [currentSkillIndex, setCurrentSkillIndex] = useState(0);

    const GetHeroSkills = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/skill/getheroskill/${heroName}`,
            {
                method: "GET",
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            if(result.data instanceof Array){
                setHeroSkill(result.data);
            }
            else{
                setHeroSkill([result.data]);
            }
        }
    }

    const UploadData = async (values, onSubmitProps) => {
        const formData = new FormData();

        for (let key in values) {  
            if (values.hasOwnProperty(key) && key !== 'ImageFile1' && !(values[key] instanceof File)) {  
                formData.append(key, values[key]);  
            }  
        }

        if(values.ImageFile1){
            formData.append('SkillImage1', values.ImageFile1.name);
            formData.append('ImageFile1', values.ImageFile1);
        }


        const serverResponse = await fetch(
            "http://localhost:3001/skill/insert",
            {
                method: "POST",
                body: formData
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

    const SwitchSkill = (action) => {
        if(action === 'next'){
            if(heroSkill[currentSkillIndex+1]){
                setCurrentSkill(heroSkill[currentSkillIndex+1]);
                setCurrentSkillIndex(currentSkillIndex + 1);
            }
        }
        else if(action === 'previous'){
            if(heroSkill[currentSkillIndex - 1]){
                setCurrentSkill(heroSkill[currentSkillIndex - 1]);
                setCurrentSkillIndex(currentSkillIndex - 1);
            }
        }
    }

    useEffect(() => {
        if(heroName){
            GetHeroSkills();

        }
        else {
            setCurrentSkill(initValue); 
        }
    }, []);

    useEffect(() => {
        if(heroSkill){
            setCurrentSkill(heroSkill[currentSkillIndex]);
        }
    }, [heroSkill]);

    return( 
        <div className='SkillImportPageBK'>
            {currentSkill &&
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={currentSkill}
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
                    <div className="SkillImportPageContent">
                        { openInputPanel &&
                        <InputPanel switcher={setOpenInputPanel}>
                            {inputPanelContent === 'SkillName' && 
                                    <div style={{
                                        display: 'grid', 
                                        gap: '5%', 
                                        width: '100%', 
                                        height:'150%',
                                        marginBottom: '4%'
                                    }}>
                                        <CustomTextField  
                                            label='技能名称'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.SkillCNName}
                                            name="SkillCNName"
                                            error={touched.SkillCNName && Boolean(errors.SkillCNName)}  
                                            helperText={errors.SkillCNName}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />
                                        <CustomTextField  
                                            label='技能英文名称'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.SkillName}
                                            name="SkillName"
                                            error={touched.SkillName && Boolean(errors.SkillName)}  
                                            helperText={errors.SkillName}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />

                                        <CustomTextField  
                                            label='拥有者'  
                                            onBlur={handleBlur}  
                                            onChange={handleChange}  
                                            value={values.Owner}
                                            name="Owner"
                                            error={touched.Owner && Boolean(errors.Owner)}  
                                            helperText={errors.Owner}
                                            style={{  
                                                gridColumn: "span 2",  
                                                display: 'flex',  
                                                alignItems: 'center',
                                            }}  
                                            size="small"  
                                        />

                                        {values.SkillType === 0 && <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                            <InputLabel id="IsInitSkill">先天技能</InputLabel>
                                            <CustomSelect
                                                labelId="IsInitSkill"
                                                label="IsInitSkill"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.IsInitSkill}
                                                defaultValue={0}
                                                name="IsInitSkill"
                                                error={Boolean(touched.IsInitSkill) && Boolean(errors.IsInitSkill)}
                                                helperText={touched.IsInitSkill && errors.IsInitSkill}
                                                style={{  
                                                    gridColumn: "span 2",  
                                                    display: 'flex',  
                                                    alignItems: 'center',
                                            }}>
                                                <MenuItem value={0}>否
                                                </MenuItem>
                                                <MenuItem value={1}>是
                                                </MenuItem>
                                            </CustomSelect>
                                        </FormControl>}
                                    </div>}
                            
                            {inputPanelContent === 'SkillImage1' &&
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png,.webp"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        const file = acceptedFiles[0];
                                        const reader = new FileReader;

                                        reader.onload = (e) => {
                                            setFieldValue("imagePreviewUrl", e.target.result);
                                        };

                                        if(file){
                                            reader.readAsDataURL(file);
                                            setFieldValue("ImageFile1", file);
                                        }
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed gray`}
                                        p="1rem"
                                        sx={{ color: 'white', "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.ImageFile1 ? (
                                            <p>添加图片</p>
                                        ) : (
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                {values.imagePreviewUrl ? (  
                                                    <img src={values.imagePreviewUrl} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />  
                                                ) : null}
                                            </div>
                                        )}
                                    </Box>
                                    )}
                                </Dropzone>
                            }

                            {inputPanelContent === 'Ability' && 
                                <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                    <InputLabel id="Ability">技能类型</InputLabel>
                                    <CustomSelect
                                        labelId="Ability"
                                        label="Ability"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Ability}
                                        defaultValue='点目标'
                                        name="Ability"
                                        error={Boolean(touched.Ability) && Boolean(errors.Ability)}
                                        helperText={touched.Ability && errors.Ability}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                    }}>
                                        <MenuItem value='点目标'>点目标
                                        </MenuItem>
                                        <MenuItem value='被动'>被动
                                        </MenuItem>
                                        <MenuItem value='无目标'>无目标
                                        </MenuItem>
                                        <MenuItem value='点矢量目标'>点矢量目标
                                        </MenuItem>
                                        <MenuItem value='单位目标'>单位目标
                                        </MenuItem>
                                        <MenuItem value='切换'>切换
                                        </MenuItem>
                                        <MenuItem value='光环'>光环
                                        </MenuItem>
                                    </CustomSelect>
                                </FormControl>}
                            
                            {inputPanelContent === 'IgnoreBKB' && 
                                <CustomTextField  
                                    label='无视减益免疫'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.IgnoreBKB}
                                    name="IgnoreBKB"
                                    error={touched.IgnoreBKB && Boolean(errors.IgnoreBKB)}  
                                    helperText={errors.IgnoreBKB}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'Affect' && 
                                <CustomTextField  
                                    label='影响'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.Affect}
                                    name="Affect"
                                    error={touched.Affect && Boolean(errors.Affect)}  
                                    helperText={errors.Affect}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'Dispellable' && 
                                <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                    <InputLabel id="Dispellable">能否驱散</InputLabel>
                                    <CustomSelect
                                        labelId="Dispellable"
                                        label="Dispellable"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.Dispellable}
                                        defaultValue='可驱散'
                                        name="Dispellable"
                                        error={Boolean(touched.Dispellable) && Boolean(errors.Dispellable)}
                                        helperText={touched.Dispellable && errors.Dispellable}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                    }}>
                                        <MenuItem value='可驱散'>可驱散
                                        </MenuItem>
                                        <MenuItem value='仅强驱散'>仅强驱散
                                        </MenuItem>
                                        <MenuItem value='不可驱散'>不可驱散
                                        </MenuItem>
                                    </CustomSelect>
                                </FormControl>}

                            {inputPanelContent === 'DamageType' && 
                                <CustomTextField  
                                    label='伤害类型'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.DamageType}
                                    name="DamageType"
                                    error={touched.DamageType && Boolean(errors.DamageType)}  
                                    helperText={errors.DamageType}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'Description' && 
                                <CustomTextArea  
                                    placeholder='技能描述'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.SkillDescription}
                                    name="SkillDescription"
                                    error={touched.SkillDescription && Boolean(errors.SkillDescription)}  
                                    helperText={errors.SkillDescription}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'InitTalent' && 
                                <div style={{
                                    display: 'grid', 
                                    gap: '15%', 
                                    width: '100%', 
                                    height:'100%',
                                    margin: '5%'
                                }}>
                                    <CustomTextField  
                                        label='命石名称'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        placeholder='无命石请留空'
                                        value={values.InitTalent}
                                        name="InitTalent"
                                        error={touched.InitTalent && Boolean(errors.InitTalent)}  
                                        helperText={errors.InitTalent}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />
                                    <CustomTextArea  
                                        placeholder='命石效果描述，无命石请留空'  
                                        onBlur={handleBlur}  
                                        onChange={handleChange}  
                                        value={values.InitTalentDescription}
                                        name="InitTalentDescription"
                                        error={touched.InitTalentDescription && Boolean(errors.InitTalentDescription)}  
                                        helperText={errors.InitTalentDescription}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                        }}  
                                        size="small"  
                                    />
                                </div>}

                            {inputPanelContent === 'Details' && 
                                <CustomTextArea  
                                    placeholder='alt额外描述'  
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
                                />}

                            {inputPanelContent === 'Statistic' && 
                                <CustomTextArea  
                                    placeholder='各种面板数据'  
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
                                />}

                            {inputPanelContent === 'Cost' && 
                                <CustomTextField  
                                    label='魔法消耗'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.Cost}
                                    name="Cost"
                                    error={touched.Cost && Boolean(errors.Cost)}  
                                    helperText={errors.Cost}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'CD' && 
                                <CustomTextField  
                                    label='CD'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.SkillCD}
                                    name="SkillCD"
                                    error={touched.SkillCD && Boolean(errors.SkillCD)}  
                                    helperText={errors.SkillCD}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'CastRange' && 
                                <CustomTextField  
                                    label='施法距离'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.CastRange}
                                    name="CastRange"
                                    error={touched.CastRange && Boolean(errors.CastRange)}  
                                    helperText={errors.CastRange}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'ExtraInfo' && 
                                <CustomTextArea  
                                    placeholder='额外背景信息'  
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
                                />}

                            {inputPanelContent === 'Sequence' && 
                                <CustomTextField  
                                    label='技能序列'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.Sequence}
                                    name="Sequence"
                                    error={touched.Sequence && Boolean(errors.Sequence)}  
                                    helperText={errors.Sequence}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"  
                                />}

                            {inputPanelContent === 'Aghanim' && 
                                <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                    <InputLabel id="IsAghanim">阿哈利姆效果</InputLabel>
                                    <CustomSelect
                                        labelId="IsAghanim"
                                        label="IsAghanim"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.IsAghanim}
                                        defaultValue={0}
                                        name="IsAghanim"
                                        error={Boolean(touched.IsAghanim) && Boolean(errors.IsAghanim)}
                                        helperText={touched.IsAghanim && errors.IsAghanim}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                    }}>
                                        <MenuItem value={0}>无
                                        </MenuItem>
                                        <MenuItem value={1}>阿哈利姆神杖技能
                                            <img src='http://localhost:3001/assets/commons/Aghanim_Scepter.webp' style={{width: '100%', borderRadius:'50%'}}/>
                                        </MenuItem>
                                        <MenuItem value={2}>阿哈利姆魔晶技能
                                            <img src='http://localhost:3001/assets/commons/Aghanim_Shard.webp' style={{width: '100%', borderRadius:'50%'}}/>
                                        </MenuItem>
                                    </CustomSelect>
                                </FormControl>}

                            {inputPanelContent === 'SkillType' && 
                                <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                                    <InputLabel id="SkillType">技能类型</InputLabel>
                                    <CustomSelect
                                        labelId="SkillType"
                                        label="SkillType"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.SkillType}
                                        defaultValue={0}
                                        name="SkillType"
                                        error={Boolean(touched.SkillType) && Boolean(errors.SkillType)}
                                        helperText={touched.SkillType && errors.SkillType}
                                        style={{  
                                            gridColumn: "span 2",  
                                            display: 'flex',  
                                            alignItems: 'center',
                                    }}>
                                        <MenuItem value={0}>英雄技能
                                        </MenuItem>
                                        <MenuItem value={1}>物品技能
                                        </MenuItem>
                                        <MenuItem value={2}>单位技能
                                        </MenuItem>
                                    </CustomSelect>
                                </FormControl>}
                        </InputPanel>}

                        <div className='SkillImportPageNavbar'>
                            {heroName && <div>
                                <Box onClick={() => SwitchSkill('previous')}
                                    sx={{
                                        position: 'absolute',
                                        left: '2.5%',
                                        width: "10%",
                                        height: '100%',
                                        color: 'rgb(161, 161, 161)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover':{
                                            color:'rgb(255, 255, 255)',
                                            cursor:'pointer'
                                        }
                                }}>
                                    上个技能
                                </Box>

                                <Box onClick={() => SwitchSkill('next')}
                                    sx={{
                                        position: 'absolute',
                                        right: '2.5%',
                                        width: "10%",
                                        height: '100%',
                                        color: 'rgb(161, 161, 161)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        '&:hover':{
                                            color:'rgb(255, 255, 255)',
                                            cursor:'pointer'
                                        }
                                }}>
                                    下个技能
                                </Box>
                            </div>}
                        </div>

                        <div className='SkillImportPageTitle'>
                            技能信息录入
                        </div>

                        <div className='SkillImportPageSkills'>
                            <div className='SkillImportPageSkillPanel'>
                                <div className='SkillImportPageSkillName' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('SkillName')}}>
                                    {values.SkillCNName ? values.SkillCNName : '技能名称'}
                                </div>

                                <div className='SkillImportPageSkillVedio'>
                                    <div className='SkillImportPageSkillImage' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('SkillImage1')}}>
                                        {values.imagePreviewUrl ? (  
                                            <img src={values.imagePreviewUrl} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />  
                                        ) : (<img src={`http://localhost:3001/assets/skills/${values.SkillImage1}`} style={{height:'100%'}}/>)}
                                    </div>

                                    <div className='SkillImportPageSequence' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Sequence')}}>
                                        {values.Sequence ? values.Sequence : '序'}
                                    </div>

                                    <div className='SkillImportPageSkillType' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('SkillType')}}>
                                        {values.SkillType === 0 ? '英' : values.SkillType === 1 ? '物' : '单'}
                                    </div>

                                    {values.SkillType === 0 && <div className='SkillImportPageAghanim' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Aghanim')}}>
                                        <img src='http://localhost:3001/assets/commons/Aghanim_Scepter.webp' style={{width: '100%', borderRadius:'50%'}}></img>
                                    </div>}
                                    技能视频，暂无。技能视频，暂无。技能视频，暂无
                                </div>
                                <div className='SkillImportPageInfo1'>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Ability')}}>
                                        技能：{values.Ability}
                                    </div>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Affect')}}>
                                        影响：{values.Affect}
                                    </div>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('IgnoreBKB')}}>
                                        无视减益免疫：{values.IgnoreBKB}
                                    </div>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Dispellable')}}>
                                        能否驱散：{values.Dispellable}
                                    </div>
                                    <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('DamageType')}}>
                                        伤害类型：{values.DamageType}
                                    </div>
                                </div>

                                <div className='SkillImportPageDescription' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Description')}}>
                                    {values.SkillDescription ? values.SkillDescription : '技能描述'}
                                </div>

                                {values.SkillType === 0 && <div onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('InitTalent')}}>
                                    <div className='SkillImportPageInitTalent' >
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
                                        <div className='SkillImportPageInitTalentName' style={{
                                            paddingLeft: '3%',
                                        }}>
                                            {values.InitTalent ? values.InitTalent : '命石名字'}
                                        </div>
                                    </div>
                                    <div className='SkillImportPageInitTalentDescription' >
                                        {values.InitTalentDescription ? values.InitTalentDescription : '命石效果描述'}
                                    </div>
                                </div>}

                                <div className='SkillImportPageDetails' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Details')}}>
                                    {values.ExtraInfo1 ? values.ExtraInfo1.split('?').map((str, index) => <div key={index}>{str}</div>) : 'alt额外信息'}
                                </div>

                                <div className='SkillImportPageSkillStatistic' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Statistic')}}>
                                    {values.ExtraInfo2 ? values.ExtraInfo2.split('?').map((str, index) => <div key={index}>{str}</div>) : '各种面板数据'}
                                </div>

                                <div className='SkillImportPageCostCD' >
                                    <div style={{flexBasis:'33%', display: 'flex'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('CD')}}>
                                        <img src='http://localhost:3001/assets/commons/cooldown.png' alt='CD' 
                                            style={{
                                                height: '72%', 
                                                width:'10%', 
                                                marginRight:'5%',
                                                borderRadius:'3px',
                                        }}/>
                                        {values.SkillCD ? values.SkillCD : 'CD'}
                                    </div>
                                    <div style={{flexBasis:'33%', display: 'flex'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('Cost')}}>
                                        <div style={{
                                            height:'72%', 
                                            width:'10%', 
                                            background:'linear-gradient(#00A4DB, #007196)',
                                            borderRadius:'3px',
                                            marginRight:'5%'
                                        }}>
                                        </div>
                                        {values.Cost ? values.Cost : '魔法消耗'}
                                    </div>
                                    <div style={{flexBasis:'33%', display: 'flex'}} onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('CastRange')}}>
                                        <div style={{
                                                height:'72%', 
                                                width:'10%', 
                                                background:'#5CFF1C',
                                                marginRight:'5%',
                                                borderRadius:'3px',
                                        }}>
                                        </div>
                                        {values.CastRange ? values.CastRange : '施法距离'}
                                    </div>
                                </div>

                                <div className='SkillImportPageExtraInfo' onClick={() => {setOpenInputPanel(!openInputPanel); setInputPanelContent('ExtraInfo')}}>
                                    {values.ExtraInfo3 ? values.ExtraInfo3 : '额外背景信息'}
                                </div>
                            </div>
                        </div>

                        
                        <Button
                            type="submit"
                            onAbort={()=> {console.log(errors)}}
                        >
                            提交信息
                        </Button>
                    </div>
                </form>)}
            </Formik>}
        </div>
    )
}

export default SkillDataImportPage;