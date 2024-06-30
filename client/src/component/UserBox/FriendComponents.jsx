import './FriendComponent.css';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AuthPanel from '../AuthPanel';
import UserSearch from '../UserSearch';
import { useSelector, useDispatch } from 'react-redux';
import { setFriendList } from '../../state/state';
import Friends from './Friends';
import notify from '../ToastBox.tsx';

const FriendComponent = () => {
    const [searchValue, setSearchValue] = useState('');
    const [openPanel, setOpenPanel] = useState(false);
    const user = useSelector(state => state.user);
    const token = useSelector(state => state.token);
    const friends = useSelector(state => state.friendList);
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = async () => {
        
    }

    const GetFriendList = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/getfriendlist/${user.UserName}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        const result = await response.json();

        if(response.status === 200){
            dispatch(setFriendList({friendList: GetFriendFromFriendShip(result.data.data)}));
        }
        else{
            notify('error', result.message);
        }
    }

    const GetFriendFromFriendShip = (frienship) => {
        const allFriends = [];
        if(!frienship){
            return allFriends;
        }
        frienship.forEach((item) => {
            if(item.User1 === user.UserName){
                allFriends.push({UserName: item.User2, LoginState: 0});
            }
            else{
                allFriends.push({UserName: item.User1, LoginState: 0});
            }
        })

        return allFriends;
    }

    useEffect(() => {
        if(user){
            GetFriendList();
        }
    }, [user]);

    return(
        <div className="FriendComponentContent">
            {openPanel && 
            <AuthPanel switcher={setOpenPanel} height='105%' top='-5%'>
                <UserSearch swither={setOpenPanel}/>
            </AuthPanel>}
            
            <div className='FriendSearch'>
                <div className='FriendSearchBar'>
                    <input
                        onChange={handleSearchChange}
                        value={searchValue}
                        placeholder="搜索好友" 
                        style={{
                            width: '85%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            border: 'none',
                            color: 'rgb(200,200,200)',
                    }}/>

                    <Box
                        onClick={handleSearch}
                        sx={{
                            padding: '0% 2%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                            '&:hover': {
                                filter: 'invert(1)',
                                cursor: 'pointer',
                            }
                    }}>
                        <img src='http://localhost:3001/assets/commons/Search_icon.png' height='70%'/>
                    </Box>
                </div>
                <Box
                    onClick={() => setOpenPanel(true)} 
                    sx={{
                        flexBasis: '15%',
                        display: 'flex',
                        paddingLeft: '1%',
                }}>
                    <PersonAddIcon
                        sx={{
                            width: '100%',
                            color: 'gray',
                            '&:hover': {
                            color: 'rgb(200,200,200)',
                            cursor: 'pointer',
                        }
                    }}/>
                </Box>
            </div>

            <div className='FriendList'>
                <Friends friends={friends}/>
            </div>
        </div>
    )
}

export default FriendComponent;