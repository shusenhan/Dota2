import { useState } from "react"
import { Button, IconButton, Box } from "@mui/material";
import './createpost.css';
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import notify from "../../component/ToastBox.tsx";

const postSchema = yup.object().shape({
    PostTitle: yup.string().required('请输入值'),
    PostContent: yup.string().required('请输入值'),
    CommunityId: yup.number().required('请输入值'),
    AuthorId: yup.number().required('请输入值'),
    CreatedDate: yup.date(),
    State: yup.number().required('请输入值'),
});

const CreatePost = ({CommunityId, refresh}) => {
    const initPostInfo = {
        PostTitle: '',
        CommunityId: CommunityId,
        PostContent: '',
        AuthorId: 0,
        CreatedDate: new Date(),
        State: 1
    };

    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const CreateNewPost = async(values, onSubmitProps) => {
        const formData = new FormData();

        formData.append('PostTitle', values.PostTitle);
        formData.append('PostContent', values.PostContent);
        formData.append('AuthorId', user.UserId);
        formData.append('CommunityId', values.CommunityId);
        

        const date = new Date(values.CreatedDate);
        const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
        formData.append('CreatedDate', formattedDate);
        formData.append('State', values.State);

        if (values.ImageFiles && values.ImageFiles.length) {
            for (let i = 0; i < values.ImageFiles.length; i++) {
                formData.append('ImageFiles', values.ImageFiles[i]);
                formData.append(`FilesName`, values[`FileName${i}`]);
            }
        }

        const serverResponse = await fetch(
            "http://localhost:3001/post/create",
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            }
        );

        const result = await serverResponse.json();

        if(serverResponse.status === 200){
            notify('success', result.message);
            onSubmitProps.resetForm();
            setIsOpen(false);
            refresh();
        }
        else{
            notify('error', result.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        console.log(values);
        CreateNewPost(values, onSubmitProps);
    }

    return (
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={initPostInfo}
            validationSchema={postSchema}
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
                <form onSubmit={handleSubmit} >
                    {user &&  <div className='CreatePostContent'>
                        <div style={{
                            height: isOpen ? '33vh' : '0',
                            overflow: 'hidden',
                            transition: 'height 0.3s ease-in-out',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                height: '5vh',
                                width: '5vh'
                            }}>
                                <IconButton onClick={() => setIsOpen(false)} sx={{height: '100%', width: '100%'}}>
                                    <CloseIcon sx={{height: '5vh', width: '5vh', color: 'rgb(215, 77, 77)'}}/>
                                </IconButton>
                            </div>
                            <div className="CreatePostTitle">
                                <input
                                    onBlur={handleBlur}  
                                    onChange={handleChange} 
                                    value={values.PostTitle}
                                    name="PostTitle"
                                    placeholder="主题名" 
                                    style={{
                                        width: '80%',
                                        height: '3.5vh'
                                }}/>
                            </div>
                            <div className='CreatePostPostContent'>
                                <textarea 
                                    onBlur={handleBlur}  
                                    onChange={handleChange} 
                                    value={values.PostContent}
                                    name="PostContent"
                                    placeholder="写下你的帖子..." 
                                    style={{
                                        resize: 'none',
                                        width: '80%',
                                        height: '15vh'
                                }}></textarea>
                            </div>
                            <div className='CreatePostAddImage'>
                                {values.ImageFiles && values.ImageFiles.map((file, index) =>  
                                    <div key={index} 
                                        style={{ 
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: '10vh', 
                                            height: '10vh', 
                                            border:'2px dashed gray'
                                    }} >
                                        <img 
                                            src={values[`imagePreviewUrl${index}`]} 
                                            alt="Selected Image" 
                                            style={{ maxWidth: '10vh', maxHeight: '10vh' }} 
                                        />  
                                    </div>
                                )}
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png,.webp"
                                    multiple={true}
                                    onDrop={(acceptedFiles) => {
                                        const filesToUpload = acceptedFiles.slice(0, 4);
                                        const fileReaders = [];

                                        filesToUpload.forEach((file, index) => {
                                            const reader = new FileReader();
                                            
                                            reader.onload = (e) => {
                                                setFieldValue(`imagePreviewUrl${index}`, e.target.result);
                                                setFieldValue(`FileName${index}`, file.name);
                                            };

                                            if (file) {
                                                reader.readAsDataURL(file);
                                                fileReaders.push(reader);
                                            }
                                        });
                                        
                                        setFieldValue("ImageFiles", filesToUpload);
                                    }}
                                    sx={{
                                        width: '20%'
                                    }}
                                >
                                    {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        border={`2px dashed gray`}
                                        sx={{ 
                                            color: 'white', 
                                            maxheight: "20vh",
                                            width: '10vh',
                                            height: '10vh',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center', 
                                            "&:hover": { 
                                                cursor: "pointer" 
                                            } 
                                        }}
                                    >
                                        <input {...getInputProps()} />
                                        <p style={{fontSize: '1.75vh'}}>添加图片</p>
                                    </Box>
                                    )}
                                </Dropzone>
                            </div>
                        </div>

                        <div className='CreatePostButton'>
                            <Button 
                                onClick={() => isOpen ? console.log(errors) : setIsOpen(true)}
                                type={isOpen ? 'submit' : 'button'}
                                sx={{
                                    padding: '0',
                                    width: '15%',
                                    height: '75%',
                                    marginRight: '2%',
                                    color: 'rgb(139, 208, 217)',
                                    backgroundColor: 'rgb(59, 138, 147)',
                                    border: 'none',
                                    fontSize: '14px',
                                    '&:hover': {
                                        backgroundColor: 'rgb(19, 98, 107)'
                                    }
                            }}>创建帖子</Button>
                        </div>
                    </div> }
                </form>)}
        </Formik>
    );
}

export default CreatePost;