import './logout.css';
import { logout } from '../../state/state';
import { useDispatch } from 'react-redux';

const LogoutPage = ({switcher}) => {
    const dispatch = useDispatch();

    const HandleLogout = () => {
        dispatch(logout());
        switcher(false);
    }
    return (
        <div className='LogoutContent'>
            <div className='LogoutContentTitle'>
                确认登出
            </div>
            <div className='LogoutContentText'>
                您确定要登出账号吗？
            </div>
            <div className='LogoutContentButton'>
                <button className='LogoutContentButton2' onClick={HandleLogout}>是</button>
                <button className='LogoutContentButton2' onClick={() => switcher(false)}>否</button>
            </div>
        </div>
    )
}

export default LogoutPage;