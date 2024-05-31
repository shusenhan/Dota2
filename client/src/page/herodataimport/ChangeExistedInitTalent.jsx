import * as yup from "yup";
import notify from '../../component/ToastBox.tsx';
import { Formik } from "formik";
import CustomTextField from "../../component/MytTextField";
import CustomSelect from '../../component/MySelect';
import CustomTextArea from '../../component/MyTextArea.jsx';
import {
    Button,
    FormControl,
    InputLabel, 
    MenuItem,
} from '@mui/material'; 

const formSchema = yup.object({
    InitTalentSequence: yup.number().required('请输入值').typeError('请输入数字'),
    InitTalentImage: yup.string(),
    InitTalentName: yup.string(),

    InitTalentCNName: yup.string().required('请输入值'),
    InitTalentColor: yup.string(),
    InitTalentDescription: yup.string().required('请输入值'),
    ITIsNewSkill1: yup.number(),
    ITAffectSkill1: yup.string(),

    ITDetails1: yup.string(),
    ITStatistic1: yup.string(),
    ITIsNewSkill2: yup.number(),
    ITAffectSkill2: yup.string(),
    ITDetails2: yup.string(),
    
    ITStatistic2: yup.string(),
    ITIsNewSkill3: yup.number(),
    ITAffectSkill3: yup.string(),
    ITDetails3: yup.string(),
    ITStatistic3: yup.string(),
});

const initTalent = {
    InitTalentSequence: 0,
    InitTalentImage: '',
    InitTalentName: '',
    InitTalentCNName: '',
    InitTalentColor: '',

    InitTalentDescription: '',
    ITIsNewSkill1: 0,
    ITAffectSkill1: '',
    ITDetails1: '',
    ITStatistic1: '',

    ITIsNewSkill2: 0,
    ITAffectSkill2: '',
    ITDetails2: '',
    ITStatistic2: '',
    ITIsNewSkill3: 0,

    ITAffectSkill3: '',
    ITDetails3: '',
    ITStatistic3: '',
}

const ChangeExistedInitTalent = ({Owner, InitTalent=null}) => {

    const SubmitIniTalent = async (values, onSubmitProps) => {
        const upload = {...values, 'InitTalentOwner': Owner};

        const serverResponse = await fetch(
            "http://localhost:3001/inittalent/insert",
            {
                method: "POST",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify(upload)
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

    const handleFormSubmit = async (values) => {
        await SubmitIniTalent(values);
    }

    return (
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={InitTalent ? InitTalent : initTalent}
            validationSchema={formSchema}
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
                <div style={{
                    display: 'flex', 
                    justifyContent:'center', 
                    alignItems:'center',
                    height: '50vh',
                    width: '80vw',
                }}>
                    <div style={{
                        width: '100%', 
                        height:'100%',
                        margin: '0.5%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4%',
                        flexBasis:'25%'
                    }}>
                        <CustomTextField  
                            label='命石名称'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.InitTalentCNName}
                            name="InitTalentCNName"
                            error={touched.InitTalentCNName && Boolean(errors.InitTalentCNName)}  
                            helperText={errors.InitTalentCNName}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='命石英文名称'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.InitTalentName}
                            name="InitTalentName"
                            error={touched.InitTalentName && Boolean(errors.InitTalentName)}  
                            helperText={errors.InitTalentName}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='命石顺序'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.InitTalentSequence}
                            name="InitTalentSequence"
                            error={touched.InitTalentSequence && Boolean(errors.InitTalentSequence)}  
                            helperText={errors.InitTalentSequence}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='图标'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.InitTalentImage}
                            name="InitTalentImage"
                            error={touched.InitTalentImage && Boolean(errors.InitTalentImage)}  
                            helperText={errors.InitTalentImage}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='命石颜色'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.InitTalentColor}
                            name="InitTalentColor"
                            error={touched.InitTalentColor && Boolean(errors.InitTalentColor)}  
                            helperText={errors.InitTalentColor}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            placeholder='命石描述'  
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
                    </div>

                    <div style={{
                        width: '100%', 
                        height:'100%',
                        margin: '0.5%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4%',
                        flexBasis:'25%'
                    }}>
                         <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                            <InputLabel id="ITIsNewSkill1">是否是新技能</InputLabel>
                            <CustomSelect
                                labelId="ITIsNewSkill1"
                                label="ITIsNewSkill1"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ITIsNewSkill1}
                                defaultValue={0}
                                name="ITIsNewSkill1"
                                error={Boolean(touched.ITIsNewSkill1) && Boolean(errors.ITIsNewSkill1)}
                                helperText={touched.ITIsNewSkill1 && errors.ITIsNewSkill1}
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
                        <CustomTextField  
                            label='关联技能名称'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITAffectSkill1}
                            name="ITAffectSkill1"
                            error={touched.ITAffectSkill1 && Boolean(errors.ITAffectSkill1)}  
                            helperText={errors.ITAffectSkill1}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            label='关联技能效果描述'  
                            onBlur={handleBlur}  
                            onChange={handleChange}
                            placeholder='关联技能效果描述' 
                            value={values.ITDetails1}
                            name="ITDetails1"
                            error={touched.ITDetails1 && Boolean(errors.ITDetails1)}  
                            helperText={errors.ITDetails1}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            placeholder='效果数据面板'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITStatistic1}
                            name="ITStatistic1"
                            error={touched.ITStatistic1 && Boolean(errors.ITStatistic1)}  
                            helperText={errors.ITStatistic1}
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
                        margin: '0.5%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4%',
                        flexBasis:'25%'
                    }}>
                         <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                            <InputLabel id="ITIsNewSkill2">是否是新技能</InputLabel>
                            <CustomSelect
                                labelId="ITIsNewSkill2"
                                label="ITIsNewSkill2"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ITIsNewSkill2}
                                defaultValue={0}
                                name="ITIsNewSkill2"
                                error={Boolean(touched.ITIsNewSkill2) && Boolean(errors.ITIsNewSkill2)}
                                helperText={touched.ITIsNewSkill2 && errors.ITIsNewSkill2}
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
                        <CustomTextField  
                            label='关联技能名称'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITAffectSkill2}
                            name="ITAffectSkill2"
                            error={touched.ITAffectSkill2 && Boolean(errors.ITAffectSkill2)}  
                            helperText={errors.ITAffectSkill2}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            label='关联技能效果描述'  
                            placeholder='关联技能效果描述' 
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITDetails2}
                            name="ITDetails2"
                            error={touched.ITDetails2 && Boolean(errors.ITDetails2)}  
                            helperText={errors.ITDetails2}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            placeholder='效果数据面板'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITStatistic2}
                            name="ITStatistic2"
                            error={touched.ITStatistic2 && Boolean(errors.ITStatistic2)}  
                            helperText={errors.ITStatistic2}
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
                        margin: '0.5%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4%',
                        flexBasis:'25%'
                    }}>
                         <FormControl fullWidth sx={{gridColumn: "span 2"}}>
                            <InputLabel id="ITIsNewSkill3">是否是新技能</InputLabel>
                            <CustomSelect
                                labelId="ITIsNewSkill3"
                                label="ITIsNewSkill3"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.ITIsNewSkill3}
                                defaultValue={0}
                                name="ITIsNewSkill3"
                                error={Boolean(touched.ITIsNewSkill3) && Boolean(errors.ITIsNewSkill3)}
                                helperText={touched.ITIsNewSkill3 && errors.ITIsNewSkill3}
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
                        <CustomTextField  
                            label='关联技能名称'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITAffectSkill3}
                            name="ITAffectSkill3"
                            error={touched.ITAffectSkill3 && Boolean(errors.ITAffectSkill3)}  
                            helperText={errors.ITAffectSkill3}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea
                            label='关联技能效果描述'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            placeholder='关联技能效果描述' 
                            value={values.ITDetails3}
                            name="ITDetails3"
                            error={touched.ITDetails3 && Boolean(errors.ITDetails3)}  
                            helperText={errors.ITDetails3}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextArea  
                            placeholder='效果数据面板'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.ITStatistic3}
                            name="ITStatistic3"
                            error={touched.ITStatistic3 && Boolean(errors.ITStatistic3)}  
                            helperText={errors.ITStatistic3}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                    </div>
                </div>

                <Button 
                    // type='submit'
                    onClick={() => {handleFormSubmit(values);}} 
                    sx={{
                        color:'rgb(161, 161, 161)',
                        backgroundColor: 'rgb(100, 100, 100)',
                        '&:hover': {
                            color: 'rgb(210, 210, 210)',
                            backgroundColor: 'rgb(161, 161, 161)',
                        }
                }}>
                    提交命石信息
                </Button>
            </form>)}
        </Formik>
    );
}

export default ChangeExistedInitTalent;