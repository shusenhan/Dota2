import './UserBox.css'
import { useNavigate } from 'react-router-dom';
import notify from '../ToastBox.tsx';

const UserBox = () => {
    const navigate = useNavigate();

    return(
        <div className="UserBoxContent" 
        style={{
            width: '300px'
        }}>
            UserInfo
            <button onClick={() => navigate('/existedhero')}>添加英雄数据</button>
            <button onClick={notify}>测试</button>
            <button onClick={() => navigate('./importskill')}>添加技能数据</button>
        </div>
    )
};

export default UserBox;