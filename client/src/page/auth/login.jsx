import './login.css';
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from 'react';
import LoginTextField from '../../component/LoginTextField';

const loginSchema = yup.object().shape({
    UserName: yup.string().required('用户名不能为空'),
    AccountPassword: yup.string().required('密码不能为空')
});

const registerSchema = yup.object().shape({
    UserName: yup.string().required('用户名不能为空'),
    AccountPassword: yup.string().required('密码不能为空'),
    ConfirmPassword: yup.string().oneOf([yup.ref('AccountPassword'), null], '两次密码不一致'),
});

const loginValue = {
    UserName: '',
    AccountPassword: ''
};

const registerValue = {
    UserName: '',
    AccountPassword: '',
    ConfirmPassword: ''
};

const LoginPage = () => {
    const [pageType, setPageType] = useState('login');

    const handleFormSubmit = async (values, onSubmitProps) => {

    };

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
                                    // type="submit" 
                                    style={{
                                        // width: '100px',
                                        // height: '35px',
                                        // backgroundColor: 'rgba(0, 0, 0, 0.75)',
                                        // border: '1px solid rgb(180, 180, 180)',
                                        // borderRadius: '5px',
                                        // fontSize: '16px',
                                        // color: 'rgb(225, 225, 225)',
                                }}>
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