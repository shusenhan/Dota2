import {useSelector} from 'react-redux';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import notify from './ToastBox.tsx';

const UserSearch = ({swither}) => {
    const user = useSelector((state) => state.user);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value);
    }

    const handleSearch = async () => {
        const response = await fetch(
            `http://localhost:3001/auth/searchuser/${searchValue}`,
            {
                method: 'GET',
            }
        );

        const result = await response.json();

        if(response.status === 200) {
            setSearchResult(result.data);
        }
        if(!result.data){
            notify('warn', '没有找到该用户');
        }
    }

    useEffect(() => {
        if(searchResult && searchResult.length > 0) {
            navigate(`/personal/?username=${searchResult[0].UserName}`);
        }
    }, [searchResult]);

    return (
        <div style={{
            height: '220px',
            width: '360px',
            background:'linear-gradient(to right, rgb(52, 52, 52) , rgb(25, 25, 25) )',
            border: '1px solid rgb(173, 173, 173)',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{
                flexBasis: '27%',
                paddingTop: '22px',
                color: 'rgb(155, 155, 155)',
                fontSize: '18px',
            }}>
                搜索好友
            </div>
            <div>
                <input
                    onChange={handleSearchChange}
                    value={searchValue}
                    placeholder="输入用户名并点击搜索"
                    style={{
                        height:'45px',
                        width:'220px',
                        textAlign: 'center',
                        backgroundColor: 'black',
                        border: '1px solid rgb(100,100,100)',
                        color: 'rgb(200,200,200)',
                        fontSize: '12px',
                    }}
                />
            </div>
            <div
                style={{
                    paddingTop: '5px',
                    fontSize: '12px',
                    color: 'rgb(135, 135, 135)'
            }}>
                {user ? 
                    <div>你的用户名: 
                        <span style={{color: 'rgb(200, 200, 200)'}}>
                            {user.UserName}
                        </span>
                    </div> : 
                '您还未登录'}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                paddingTop: '15px'
            }}>
                <Button 
                    onClick={handleSearch}
                    sx={{
                        color: 'rgb(225, 225, 225)',
                        fontSize: '14px',
                        width: '140px',
                        height: '35px',
                        border: '1px solid rgb(172, 172, 172)',
                        borderRadius: '0px',
                        background: 'linear-gradient(180deg, rgb(41, 41, 41), rgb(105, 105, 105))',
                        '&:hover': {
                            pointer: 'cursor',
                            background: 'rgb(140,140,140)',
                        }
                }}>搜索</Button>

                <Button
                    onClick={() => swither(false)} 
                    sx={{
                        color: 'rgb(225, 225, 225)',
                        fontSize: '14px',
                        width: '140px',
                        height: '35px',
                        border: '1px solid rgb(172, 172, 172)',
                        borderRadius: '0px',
                        background: 'linear-gradient(180deg, rgb(41, 41, 41), rgb(105, 105, 105))',
                        '&:hover': {
                            pointer: 'cursor',
                            background: 'rgb(140,140,140)',
                        }
                }}>取消</Button>
            </div>
        </div>
    );
};

export default UserSearch;