import * as yup from "yup";
import { Formik } from 'formik';
import notify from "../../component/ToastBox.tsx";
import './createcommunity.css';
import CustomTextField from "../../component/MytTextField.jsx";
import Dropzone from "react-dropzone";
import { Box, Button } from "@mui/material";
import InputPanel from "../herodataimport/InputPanel.jsx";
import CustomTextArea from "../../component/MyTextArea.jsx";
import { useEffect, useState } from "react";
import useDebounce from "../../component/useDebounce.js";
import Friend from "../../component/UserBox/Friend.jsx";

const communitySchema = yup.object().shape({
    CommunityName: yup.string().required('请输入值'),
    CommunityIcon: yup.string(),
    CommunityAdmin: yup.array().of(yup.object().shape({})).required('请至少指定一个管理员'),
    CreatedDate: yup.date(),
    State: yup.number().required('请输入值'),
    Description: yup.string()
});

const initCommunityInfo = {
    CommunityName: '',
    CommunityIcon: 'dota2_logo.png',
    CommunityAdmin: [],
    CreatedDate: new Date(),
    State: 1,
    Description: "社区描述"
};

const CreateCommunity = () => {
    const [openInputPanel, setOpenInputPanel] = useState(false);
    const [searchContent, setSearchContent] = useState("");
    const [adminResult, setAdminResult] = useState([]);
    const debouncedSearchTerm = useDebounce(searchContent, 800);

    const UploadData = async (values, onSubmitProps) => {
        const formData = new FormData();

        for (let key in values) {  
            if (values.hasOwnProperty(key) && key !== 'ImageFile1' && !(values[key] instanceof File) && key !== 'CommunityAdmin' && key !== 'CreatedDate') {  
                formData.append(key, values[key]);  
            }  
        }

        const date = new Date(values.CreatedDate);
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        formData.append('CreatedDate', formattedDate);

        values.CommunityAdmin.forEach((item) => {
            formData.append('CommunityAdmin', item.UserId);
        })

        if(values.ImageFile1){
            formData.append('ImageFile1', values.ImageFile1);
        }

        const serverResponse = await fetch(
            "http://localhost:3001/community/create",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await serverResponse.json();

        console.log(result);
        
        
        if(serverResponse.status === 200){
            notify('success', result.message);
            onSubmitProps.resetForm();
        }
        else{
            notify('error', result.message);
        }
    };

    const SearchAdmin = async () => {
        const serverResponse = await fetch(
            `http://localhost:3001/auth/getUserByLike/${searchContent}`,
            {
                method: "GET",
            }
        );

        const result = await serverResponse.json();
        
        if(serverResponse.status === 200){
            setAdminResult(result.data);
        }
        else{
            notify('error', result.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values);
        await UploadData(values, onSubmitProps);
    }

    useEffect(() => {
        if (debouncedSearchTerm){
            SearchAdmin();
        }
    }, [debouncedSearchTerm]);

    return(
        <div className="CreateCommunityContent">
            <Formik 
                onSubmit={handleFormSubmit}
                initialValues={initCommunityInfo}
                validationSchema={communitySchema}
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
                    <form onSubmit={handleSubmit} className="InputCommunityData">
                            { openInputPanel && 
                            <InputPanel switcher={setOpenInputPanel}>
                                <div style={{fontSize: '1.75vh', color: 'white'}}>
                                    <div>用户查询</div>
                                    <input 
                                        value={searchContent} 
                                        onChange={(e) => {setSearchContent(e.target.value)}}
                                        placeholder="输入用户名并点击搜索"
                                        style={{
                                            height:'5vh',
                                            width:'30vh',
                                            textAlign: 'center',
                                            backgroundColor: 'black',
                                            border: '1px solid rgb(100,100,100)',
                                            color: 'rgb(200,200,200)',
                                            fontSize: '1.75vh'
                                        }}
                                    />
                                    <div className="SearchAdminResult" style={{height: '50vh'}}>
                                        {adminResult && adminResult.map((item, index) => 
                                            <div key={index} className="AdminSearchResultCell">
                                                <Friend friend={item} height="100%"/>
                                                <button 
                                                    type="button"
                                                    onClick={() => {
                                                        const newAdmins = [...values.CommunityAdmin, item];
                                                        setFieldValue('CommunityAdmin', newAdmins);
                                                    }}
                                                    style={{
                                                        height:'40%', 
                                                        width:"30%", 
                                                        marginRight:"2.5%",
                                                        fontSize: '1.5vh'
                                                }}>选择</button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </InputPanel>}

                            <div className="InputCommunityDataTitle">
                                创建社区
                            </div>
                            <div className="CommunityDataForm">
                                <div className="CommunityDataFormItemTitle">社区名称</div>
                                <CustomTextField  
                                    label='社区名'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.CommunityName}
                                    name="CommunityName"
                                    error={touched.CommunityName && Boolean(errors.CommunityName)}  
                                    helperText={errors.CommunityName}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"
                                    isRight={false}  
                                />

                                <div className="CommunityDataFormItemTitle">社区图标</div>
                                {/* <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png,.webp"
                                    multiple={false}
                                    onDrop={(acceptedFiles) => {
                                        const file = acceptedFiles[0];
                                        const reader = new FileReader;

                                        reader.onload = (e) => {
                                            setFieldValue("imagePreviewUrl", e.target.result);
                                            setFieldValue("CommunityIcon", file.name);
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
                                        p="2%"
                                        sx={{ color: 'white', maxheight: "20vh", "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.imagePreviewUrl ? (
                                                <p>添加图片</p>
                                            ) : (
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                }}>
                                                    {values.imagePreviewUrl ? (  
                                                        <img src={values.imagePreviewUrl} alt="Selected Image" style={{ maxWidth: '100%', maxHeight: '16vh' }} />  
                                                    ) : null}
                                                </div>
                                        )}
                                    </Box>
                                    )}
                                </Dropzone> */}

                                <div className="CommunityDataFormItemTitle">指定管理员</div>
                                <div>
                                    <Button onClick={() => setOpenInputPanel(!openInputPanel)}
                                        type="button" 
                                        sx={{
                                            fontSize: '1.75vh',
                                            color:'rgb(161, 161, 161)',
                                            width: "12vh",
                                            height: "3.5vh",
                                            backgroundColor: 'rgb(58, 149, 88)',
                                            padding: '1%',
                                            '&:hover': {
                                                color: 'rgb(240, 240, 240)',
                                                backgroundColor: 'rgb(108, 199, 138)'
                                            }
                                    }}>
                                        添加管理员
                                    </Button>
                                </div>
                                <div className="CommunityDataFormAddedAdmin">
                                    {values.CommunityAdmin && values.CommunityAdmin.map((item, index) => 
                                        <Box key={index}
                                            onClick={() => {
                                                const newAdmins = values.CommunityAdmin.filter((admin, i) => i !== index);
                                                setFieldValue('CommunityAdmin', newAdmins);
                                            }} 
                                            sx={{
                                                display: "flex",
                                                justifyContent:"center",
                                                alignItems: "center",
                                                fontSize: '1.75vh',
                                                color:'white',
                                                width: "12vh",
                                                height: "3vh",
                                                borderRadius: "8px",
                                                backgroundColor: 'rgba(14,230,223, 0.8)',
                                                padding: '1%',
                                                '&:hover': {
                                                    color: 'rgb(200,200,200)',
                                                    backgroundColor: 'rgb(4, 160, 160)'
                                                }
                                        }}>
                                            <div>
                                                {item.UserName}
                                            </div>
                                        </Box>
                                    )}
                                </div>

                                <div className="CommunityDataFormItemTitle">社区简述</div>
                                <CustomTextArea  
                                    placeholder='请输入...'  
                                    onBlur={handleBlur}  
                                    onChange={handleChange}  
                                    value={values.Description}
                                    name="Description"
                                    error={touched.Description && Boolean(errors.Description)}  
                                    helperText={errors.Description}
                                    style={{  
                                        gridColumn: "span 2",  
                                        display: 'flex',  
                                        alignItems: 'center',
                                    }}  
                                    size="small"
                                    isRight={false}  
                                    width="50%"
                                />

                                <div>
                                    <Button type='submit'
                                        // onClick={() => console.log(errors)}
                                        sx={{
                                            marginTop:"20%",
                                            fontSize: '1.75vh',
                                            color:'rgb(161, 161, 161)',
                                            width: "12vh",
                                            height: "3.5vh",
                                            padding: "0",
                                            backgroundColor: 'rgb(58, 149, 88)',
                                            '&:hover': {
                                                color: 'rgb(240, 240, 240)',
                                                backgroundColor: 'rgb(108, 199, 138)'
                                            }
                                    }}>
                                        创建
                                    </Button>
                                </div>
                            </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default CreateCommunity;