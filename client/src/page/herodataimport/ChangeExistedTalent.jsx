import * as yup from "yup";
import notify from '../../component/ToastBox.tsx';
import { Formik } from "formik";
import CustomTextField from "../../component/MytTextField";
import CustomSelect from '../../component/MySelect';
import CustomTextArea from '../../component/MyTextArea.jsx';
import {
    Box,
    Button,
} from '@mui/material'; 

const formSchema = yup.object({
    Lvl10TalentL : yup.string().required('请输入值'),
    Lvl10TalentR : yup.string().required('请输入值'),
    Lvl15TalentL : yup.string().required('请输入值'),
    Lvl15TalentR : yup.string().required('请输入值'),
    Lvl20TalentL : yup.string().required('请输入值'),
    Lvl20TalentR : yup.string().required('请输入值'),
    Lvl25TalentL : yup.string().required('请输入值'),
    Lvl25TalentR : yup.string().required('请输入值'),
});

const initTalent = {
    Lvl10TalentL : '',
    Lvl10TalentR : '',
    Lvl15TalentL : '',
    Lvl15TalentR : '',
    Lvl20TalentL : '',
    Lvl20TalentR : '',
    Lvl25TalentL : '',
    Lvl25TalentR : '',
}

const ChangeExistedTalent = ({Owner, talent}) => {
    
    const SubmitTalent = async (values, onSubmitProps) => {
        const upload = {...values, 'TalentOwner': Owner};

        const serverResponse = await fetch(
            "http://localhost:3001/talent/insert",
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
        await SubmitTalent(values);
    }

    return(
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={talent ? talent : initTalent}
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
                    flexDirection: 'column',
                    gap: '2%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50vw',
                }}>
                    <div style={{
                        width: '100%', 
                        height:'100%',
                        margin: '0.5%',
                        display: 'flex',
                        gap: '4%',
                        flexBasis:'25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CustomTextField  
                            label='10级天赋左'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl10TalentL}
                            name="Lvl10TalentL"
                            error={touched.Lvl10TalentL && Boolean(errors.Lvl10TalentL)}  
                            helperText={errors.Lvl10TalentL}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='10级天赋右'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl10TalentR}
                            name="Lvl10TalentR"
                            error={touched.Lvl10TalentR && Boolean(errors.Lvl10TalentR)}  
                            helperText={errors.Lvl10TalentR}
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
                        gap: '4%',
                        flexBasis:'25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CustomTextField  
                            label='15级天赋左'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl15TalentL}
                            name="Lvl15TalentL"
                            error={touched.Lvl15TalentL && Boolean(errors.Lvl15TalentL)}  
                            helperText={errors.Lvl15TalentL}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='15级天赋右'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl15TalentR}
                            name="Lvl15TalentR"
                            error={touched.Lvl15TalentR && Boolean(errors.Lvl15TalentR)}  
                            helperText={errors.Lvl15TalentR}
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
                        gap: '4%',
                        flexBasis:'25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CustomTextField  
                            label='20级天赋左'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl20TalentL}
                            name="Lvl20TalentL"
                            error={touched.Lvl20TalentL && Boolean(errors.Lvl20TalentL)}  
                            helperText={errors.Lvl20TalentL}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='20级天赋右'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl20TalentR}
                            name="Lvl20TalentR"
                            error={touched.Lvl20TalentR && Boolean(errors.Lvl20TalentR)}  
                            helperText={errors.Lvl20TalentR}
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
                        gap: '4%',
                        flexBasis:'25%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <CustomTextField  
                            label='25级天赋左'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl25TalentL}
                            name="Lvl25TalentL"
                            error={touched.Lvl25TalentL && Boolean(errors.Lvl25TalentL)}  
                            helperText={errors.Lvl25TalentL}
                            style={{  
                                gridColumn: "span 2",  
                                display: 'flex',  
                                alignItems: 'center',
                            }}  
                            size="small"  
                        />
                        <CustomTextField  
                            label='25级天赋右'  
                            onBlur={handleBlur}  
                            onChange={handleChange}  
                            value={values.Lvl25TalentR}
                            name="Lvl25TalentR"
                            error={touched.Lvl25TalentR && Boolean(errors.Lvl25TalentR)}  
                            helperText={errors.Lvl25TalentR}
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
                        margin: '1%',
                        color:'rgb(161, 161, 161)',
                        backgroundColor: 'rgb(100, 100, 100)',
                        '&:hover': {
                            color: 'rgb(210, 210, 210)',
                            backgroundColor: 'rgb(161, 161, 161)',
                        }
                }}>
                    提交天赋信息
                </Button>
            </form>)}
        </Formik>
    )
}

export default ChangeExistedTalent;