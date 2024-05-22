import { 
    InputBase, 
    IconButton, 
    Button,
} from "@mui/material";
import FlexBetween from "../../component/FlexBetween";
import Image from "../../component/Image";
import './navbar.css';
import NavbarContent from "./content";
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    return(
        <div className="NavbarContent">
            <FlexBetween>
                <div className="Dota2Logo" onClick={() => navigate('/')}>
                    <Image width='78px' height='90px' src='../common/Dota-2-Logo.png'/>
                </div>
                
                <div style={{flexBasis:'66%'}}>
                    <FlexBetween sx={{ justifyContent: 'flex-end', gap:'10px' }}>
                        <Button
                            className="Button"
                            sx={{
                            color:'#F9BA1A',
                            border:'1px solid #F9BA1A',
                            '&:hover':{
                                'color': '#F78C00',
                                'animation': 'flameShake 0.5s infinite'
                            },
                            cursor:'url(../theme/login/fire.png), auto'
                        }}>
                            登录
                        </Button>

                        <Button
                            className="Button"
                            sx={{
                                color:'#FF8330',
                                border:'1px solid #FF8330'
                        }}>注册</Button>
                    </FlexBetween>

                    <FlexBetween sx={{gap: "24px"}}>
                        <NavbarContent style={{flexBasis:'50%'}}/>
                        <FlexBetween className="SearchBar" >
                            <IconButton >
                                <SearchIcon/>
                            </IconButton>
                            <InputBase 
                                fullWidth
                                placeholder="搜索框"
                            />  
                        </FlexBetween>
                    </FlexBetween>
                </div>
            </FlexBetween>
        </div>
    )
};

export default Navbar;