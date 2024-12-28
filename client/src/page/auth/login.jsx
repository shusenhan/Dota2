import './login.css';
import { Formik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from 'react';
import LoginTextField from '../../component/LoginTextField';
import notify from '../../component/ToastBox.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from '../../state/state.js';
import { useChat } from '../../component/Chat/useChat.jsx';
import { SocketInitialize } from '../../socket/socketfunction.js';

const loginSchema = yup.object().shape({
    UserName: yup.string().required('用户名不能为空'),
    AccountPassword: yup.string().required('密码不能为空'),
    ConfirmPassword: yup.string(),
});

const registerSchema = yup.object().shape({
    UserName: yup.string().required('用户名不能为空'),
    AccountPassword: yup.string().required('密码不能为空'),
    ConfirmPassword: yup.string().oneOf([yup.ref('AccountPassword'), null], '两次密码不一致'),
});

const loginValue = {
    UserName: '',
    AccountPassword: '',
    ConfirmPassword: ''
};

const registerValue = {
    UserName: '',
    AccountPassword: '',
    ConfirmPassword: ''
};

const LoginPage = ({switcher}) => {
    const [pageType, setPageType] = useState('login');
    const dispatch = useDispatch();
    const {InitializeSocket, socket} = useChat();
    const user = useSelector(state => state.user);

    const HandleLogin = async (values, resetForm) => {
        const response = await fetch(
            'http://localhost:3001/auth/login',
            // 'https://server-kappa-khaki.vercel.app/auth/login',
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(values)
            }
        )

        const result = await response.json();

        if(response.status === 200){
            notify('success', '登录成功');
            switcher(false);
            dispatch(userlogin({
                user: result.data, 
                token: result.token
            }));
            resetForm();
        }
        else{
            notify('error', result.message);
        }
    };
    
    const HandleRegister = async (values, resetForm) => {
        const response = await fetch(
            'http://localhost:3001/auth/register', 
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(values)
            }
        )

        const result = await response.json();

        if(response.status === 200){
            notify('success', '注册成功');
            setPageType('login');
            resetForm();
        }
        else{
            notify('error', result.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        if(pageType === 'login'){
            HandleLogin(values, onSubmitProps.resetForm);
        }
        else{
            HandleRegister(values, onSubmitProps.resetForm);
        }
    };

    useEffect(() => {
        if(user){
            const connection = SocketInitialize(user.UserName);
            InitializeSocket(connection);
        }
    }, [user])

    return (
        <div className="LoginContent">
            <div className='LoginContentTitle'>
                登录
            </div>
            <div className='LoginContentForm'>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={pageType === 'login' ? loginValue : registerValue}
                    validationSchema={pageType === 'login' ? loginSchema : registerSchema}
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
                        resetForm
                    }) => (
                        <form onSubmit={handleSubmit} style={{width:'100%', height:'100%'}}>
                            <div className="123" style={{
                                width: '100%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px',
                                paddingTop: '20px' 
                            }}>
                                <LoginTextField
                                    label="用户名"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.UserName}
                                    name="UserName"
                                    error={Boolean(touched.UserName) && Boolean(errors.UserName)}
                                    helperText={touched.UserName && errors.UserName}
                                    sx={{gridColumn: "span 4"}}
                                />
                                <LoginTextField
                                    label="密码"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.AccountPassword}
                                    name="AccountPassword"
                                    error={Boolean(touched.AccountPassword) && Boolean(errors.AccountPassword)}
                                    helperText={touched.AccountPassword && errors.AccountPassword}
                                    sx={{gridColumn: "span 4"}}
                                />
                                {
                                    pageType === 'register' && (
                                        <LoginTextField
                                            label="确认密码"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.ConfirmPassword}
                                            name="ConfirmPassword"
                                            error={Boolean(touched.ConfirmPassword) && Boolean(errors.ConfirmPassword)}
                                            helperText={touched.ConfirmPassword && errors.ConfirmPassword}
                                            sx={{gridColumn: "span 4"}}
                                        />
                                    )
                                } 
                                <button className='LoginContentLoginButton'
                                    type='submit'
                                >
                                    {pageType === 'login' ? '登录' : '注册'}
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
            <div className='LoginPageTypeSwitch'>
                <div
                    onClick={() => setPageType(pageType === 'login' ? 'register' : 'login')}
                >
                    {pageType === 'login' ? '没有账号？点击注册！' : '已有账号？点击登录！'}
                </div>
            </div>
        </div>
    )
}

export default LoginPage;