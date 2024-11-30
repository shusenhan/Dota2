import './communitycenter.css';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const CommunityAdministrationCenter = () => {
    const navigate = useNavigate();

    return(
        <div className="CommunityAdministrationCenterContent">
            <div className='CommunityAdministrationCenterContentTitle'>
                社区管理中心
                <div className='CreateCommunityButton'>
                    <Button onClick={() => navigate('\import')} 
                        sx={{
                            color:'rgb(161, 161, 161)',
                            '&:hover': {
                                color: 'rgb(210, 210, 210)',
                            }
                    }}>
                    创建新社区</Button>
                </div>
            </div>
            
        </div>
    )
}

export default CommunityAdministrationCenter;