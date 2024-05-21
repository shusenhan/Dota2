import './skillimportpage.css';
import { Button, FormControl, InputLabel, MenuItem, Box } from '@mui/material';  
import { Formik } from "formik";
import * as yup from "yup";
import CustomTextField from "../../component/MytTextField";
import CustomSelect from '../../component/MySelect';
import notify from '../../component/ToastBox.tsx';
import Dropzone from "react-dropzone";
import FlexBetween from '../../component/FlexBetween.jsx';
import EditIcon from '@mui/icons-material/Edit';

const heroSchema = yup.object().shape({
    SkillName: yup.string().required('请输入值'),
    SkillCNName: yup.string().required('请输入值'),
    SkillDescription: yup.string().required('请输入值'),
    ImageFile1: yup.mixed(),
    ImageFile2: yup.mixed(),
    ImageFile3: yup.mixed(),
    SkillType: yup.number().required('请输入值'),
    Cost: yup.string().required('请输入值'),
    SkillCD: yup.string().required('请输入值'),
    Sequence: yup.number().required('请输入值').typeError('请输入数字'),
    ExtraInfo1: yup.string().required('请输入值'),
    ExtraInfo2: yup.string().required('请输入值'),
    ExtraInfo3: yup.string().required('请输入值'),
    Owner: yup.string().required('请输入值')
});

const initValue = {
    SkillName: '',
    SkillCNName: '',
    SkillDescription: '',
    ImageFile1: "",
    ImageFile2: '',
    ImageFile3: '',
    SkillType: 0,
    Cost: '',
    SkillCD: '',
    Sequence: 0,
    ExtraInfo1: '',
    ExtraInfo2: '',
    ExtraInfo3: '',
    Owner: ''
};

const SkillDataImportPage = () => {

    const UploadData = async (values, onSubmitProps) => {
        console.log(values)

        const formData = new FormData();

        for (let key in values) {  
            if (values.hasOwnProperty(key) && key !== 'ImageFile1' && !(values[key] instanceof File)) {  
                formData.append(key, values[key]);  
            }  
        }

        if(!values.ImageFile1){
            formData.append('SkillImage1', values.ImageFile1.name);
        }

        const serverResponse = await fetch(
            "http://localhost:3001/skill/insert",
            {
                method: "POST",
                body: formData
            }
        );

        console.log(formData.get('ImageFile1'))

        const result = await serverResponse.json();
        console.log(result)
        
        
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

    return(
        <div className="SkillImportPageContent">
            <div className="SkillImportPageBox2">
                <div
                    style={{
                        fontWeight: 500,
                        fontSize: '20px',
                        color: '#F9BA1A'
                    }}
                >
                    技能信息录入
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
                                    label='中文名称'  
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
                                    label='技能所有者'  
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

                                <CustomTextField  
                                    label='技能介绍'  
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
                                />

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
                                        <MenuItem value={0} style={{ display: 'flex', alignItems: 'center' }}>主动技能
                                        </MenuItem>
                                        <MenuItem value={1}>被动技能
                                        </MenuItem>
                                    </CustomSelect>
                                </FormControl>

                                <Box
                                    gridColumn="span 2"
                                    border='1px solid black'
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        acceptedFiles=".jpg,.jpeg,.png,.webp"
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                        setFieldValue("ImageFile1", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed black`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!values.ImageFile1 ? (
                                            <p>Add Picture Here</p>
                                            ) : (
                                            <FlexBetween>
                                                <div>{values.ImageFile1.name}</div>
                                                <EditIcon />
                                            </FlexBetween>
                                            )}
                                        </Box>
                                        )}
                                    </Dropzone>
                                </Box>

                                <CustomTextField  
                                    label='技能消耗'  
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
                                />
                                <CustomTextField  
                                    label='技能冷却'  
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
                                />
                                <CustomTextField  
                                    label='技能排序'  
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
                                />
                                <CustomTextField  
                                    label='额外信息1'  
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
                                <CustomTextField  
                                    label='额外信息2'  
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
                                <CustomTextField  
                                    label='额外信息3'  
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

export default SkillDataImportPage;