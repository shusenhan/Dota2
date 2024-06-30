import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Friend = ({friend}) => {
    const navigate = useNavigate();

    return (
        <Box 
            onClick={() => navigate(`/personal/?username=${friend.UserName}`)}
            sx={{
                width: '100%',
                height: '10%',
                margin: '1% 0% 0% 3%',
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                    cursor: 'pointer',
                }
        }}>
            <div style={{
                height: '80%',
            }}>
                <img src='http://localhost:3001/assets/commons/user_icon.jpg' style={{height:'100%'}}/>
            </div>
            <div style={{
                marginLeft: '2%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
                <div style={{
                    flexBasis: '60%',
                    fontSize: '1.85vh',
                    color: 'rgb(200,200,200)',
                }}>
                    {  friend.UserName }
                </div>
                <div style={{
                    flexBasis: '40%',
                    fontSize: '1.5vh',
                    color: 'rgb(200,200,200)',
                }}>
                    {friend.LoginState === 0 && <div style={{color: 'gray'}}>离线</div>}
                    {friend.LoginState === 1 && <div style={{color: 'green'}}>在线</div>}
                    {friend.LoginState === 2 && <div style={{color: 'rgb(50, 100, 180)'}}>离开</div>}
                </div>
            </div>
        </Box>
    )
}

export default Friend;