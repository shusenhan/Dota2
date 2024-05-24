import './FriendComponent.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const FriendComponent = () => {
    return(
        <div className="FriendComponentContent">
            <div className='FriendSearch'>
                <div className='FriendSearchBar'>
                    <input placeholder="搜索好友" style={{
                        width: '80%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        border: 'none',
                    }}/>

                    <img src='http://localhost:3001/assets/commons/Search_icon.png' height='70%'/>
                </div>
                <div style={{
                    flexBasis: '15%',
                    display: 'flex',
                    paddingLeft: '1%',
                }}>
                    <PersonAddIcon sx={{
                        color: 'gray',
                    }}/>
                    <PersonAddIcon sx={{
                        color: 'gray',
                    }}/>
                </div>
            </div>
        </div>
    )
}

export default FriendComponent;