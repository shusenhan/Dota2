import { useState } from "react"
import { Button, IconButton, Box } from "@mui/material";
import './createcomment.css';
import Dropzone from "react-dropzone";
import * as yup from "yup";
import { Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import notify from "../../component/ToastBox.tsx";

const commentSchema = yup.object().shape({
    CommentContent: yup.string().required('请输入值'),
    PostId: yup.number().required('请输入值'),
    AuthorId: yup.number().required('请输入值'),
    CreatedDate: yup.date(),
    State: yup.number().required('请输入值'),
});

const CreateComment = ({postId, refresh}) => {
    const initCommentInfo = {
        CommentContent: '',
        PostId: postId,
        AuthorId: 0,
        CreatedDate: new Date(),
        State: 1
    };

    const [isOpen, setIsOpen] = useState(false);
    const user = useSelector((state) => state.user);

    const CreateNewComment = async(values, onSubmitProps) => {
        const formData = new FormData();

        formData.append('CommentContent', values.CommentContent);
        formData.append('PostId', values.PostId);
        formData.append('AuthorId', user.UserId);

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
            "http://localhost:3001/post/createComment",
            {
                method: "POST",
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
        CreateNewComment(values, onSubmitProps);
    }

    return (
        <Formik 
            onSubmit={handleFormSubmit}
            initialValues={initCommentInfo}
            validationSchema={commentSchema}
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
                    {user &&  <div className='CreateCommentContent'>
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
                            <div className='CreateCommentCoemmentContent'>
                                <textarea 
                                    onBlur={handleBlur}  
                                    onChange={handleChange} 
                                    value={values.CommentContent}
                                    name="CommentContent"
                                    placeholder="回复..." 
                                    style={{
                                        resize: 'none',
                                        width: '80%',
                                        height: '15vh'
                                }}></textarea>
                            </div>
                            <div className='CreateCommentAddImage'>
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
                                {/* <Dropzone
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
                                </Dropzone> */}
                            </div>
                        </div>

                        <div className='CreateCommentButton'>
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
                            }}>回复</Button>
                        </div>
                    </div> }
                </form>)}
        </Formik>
    );
}

export default CreateComment;