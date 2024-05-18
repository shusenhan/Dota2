import './UserBox.css'
import { useNavigate } from 'react-router-dom';

const UserBox = () => {
    const navigate = useNavigate();

    return(
        <div className="UserBoxContent" 
        style={{
            width: '300px'
        }}>
            UserInfo
            <button onClick={() => navigate('/importhero')}>添加英雄数据</button>
        </div>
    )
};

export default UserBox;