import { useNavigate } from 'react-router-dom';
import './communitycell.css';
import { Button } from '@mui/material';

const CommunityCell = ({ community }) => {
    const navigate = useNavigate();

    return (
        <div className='CommunityCellContent'>
            <div className="CommunityCellLeft">
                <div className='CommunityIcon'>
                    <img src={`http://localhost:3001/assets/commons/${community.CommunityIcon}`} alt={`${community.CommunityName}`}/>
                </div>
                <div className='CommunityName'>
                    {community.CommunityName}
                </div>
            </div>
            
            <div className="CommunityCellRight">
                <div className="CommunityEnterButton">
                    <Button onClick={() => navigate(`/community/${community.CommunityId}`)} sx={{
                        height: '3.5vh',
                        width: '10vh',
                        padding: '0',
                        color: 'rgb(139, 208, 217)',
                        backgroundColor: 'rgb(59, 138, 147)',
                        border: 'none',
                        fontSize: '14px',
                        '&:hover': {
                            backgroundColor: 'rgb(19, 98, 107)'
                        }
                    }}>进入</Button>
                </div>
            </div>    
        </div>
    )
}

export default CommunityCell;