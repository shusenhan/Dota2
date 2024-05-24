import './UserBox.css'
import { useNavigate } from 'react-router-dom';
import UserCard from './UserCard';
import FriendComponent from './FriendComponents';

const UserBox = () => {
    const navigate = useNavigate();

    return(
        <div className="UserBoxContent">
            <UserCard />
            <FriendComponent />
        </div>
    )
};

export default UserBox;