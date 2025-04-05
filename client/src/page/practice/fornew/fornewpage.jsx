import { Box } from "@mui/material";
import './fornewpage.css';
import { useNavigate } from "react-router-dom";

const ForNewPage = () => {
    const navigate = useNavigate();

    return(
        <div className="ForNewPageContent"> 
            <div className="ForNewPageContentLeft">
                <div className="ForNewPageContentTop">

                </div>
                <div className="ForNewPageContentLeftContent">
                    <div className="ForNewItems">
                        <Box className="ForNewCreeps ForNewItemsPicture"
                            onClick={() => navigate('intro3D/creep')}
                            sx={{
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("http://localhost:3001/assets/commons/dota-2-creepsjpg.jpg") center/cover',
                                transition: 'transform 0.25s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    background: 'url("http://localhost:3001/assets/commons/dota-2-creepsjpg.jpg") center/cover'
                                }
                        }}>

                        </Box>
                        <div className="ForNewItemsDescription">
                            小兵: 我才是主角
                        </div>
                    </div>
                    <div className="ForNewItems">
                        <Box className="ForNewCreeps ForNewItemsPicture"
                            onClick={() => navigate('intro3D/ncreep')}
                            sx={{
                                background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url("http://localhost:3001/assets/commons/R.jpg") center/cover',
                                transition: 'transform 0.25s',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    background: 'url("http://localhost:3001/assets/commons/R.jpg") center/cover'
                                }
                        }}>

                        </Box>
                        <div className="ForNewItemsDescription">
                            野怪: 无人问津的角落
                        </div>
                    </div>
                    <div className="ForNewItems">

                    </div>
                    <div className="ForNewItems">

                    </div>
                    <div className="ForNewItems">

                    </div>
                    <div className="ForNewItems">

                    </div>
                    <div className="ForNewItems">

                    </div>
                    <div className="ForNewItems">

                    </div>
                </div>
                <div className="ForNewPageContentBottom">

                </div>
            </div>

            <div className="ForNewPageContentRight">

            </div>
            
        </div>
    )
};

export default ForNewPage;