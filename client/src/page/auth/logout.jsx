import './logout.css';

const LogoutPage = () => {
    return (
        <div className='LogoutContent'>
            <div className='LogoutContentTitle'>
                确认登出
            </div>
            <div className='LogoutContentText'>
                您确定要登出账号吗？
            </div>
            <div className='LogoutContentButton'>
                <button className='LogoutContentButton2'>是</button>
                <button className='LogoutContentButton2'>否</button>
            </div>
        </div>
    )
}

export default LogoutPage;