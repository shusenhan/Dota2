import FlexBetween from "../../component/FlexBetween";
import './navbar.css';
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import NavbarContentItem from "./item";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { changePage, logout } from "../../state/state";
import NavbarContentItem2 from "./item2";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import MailIcon from '@mui/icons-material/Mail';
import AuthPanel from "../../component/AuthPanel.jsx";
import LoginPage from "../auth/login.jsx";
import LogoutPage from "../auth/logout.jsx";

const Navbar = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const selected = useSelector(state => state.selectedPage);
    const user = useSelector(state => state.user);
    const [openPanel, setOpenPanel] = useState("");

    const [BK1, setBK1] = useState('radial-gradient(circle at 15% center, #ff7847 0%, rgb(48, 48, 48) 10%, rgb(17, 17, 17))');
    const [BK2, setBK2] = useState('radial-gradient(circle at center, gold, #ca6642)');
    const [BB, setBB] = useState('3px solid #eebb79');

    const Logout = () => {
        dispatch(logout());
    }

    const Login = () => {
        
    }

    useMemo(() => {
        if(selected === 'home'){
            setBK1('radial-gradient(circle at 15% center, #ff7847 0%, rgb(48, 48, 48) 10%, rgb(17, 17, 17))');
            setBK2('radial-gradient(circle at center, gold, #ca6642)');
            setBB('3px solid #eebb79');
        }
        else{
            setBK1('radial-gradient(circle at 15% center, rgb(48, 48, 48) 0%, rgb(48, 48, 48) 10%, rgb(17, 17, 17))');
            setBK2('radial-gradient(circle at center, #4f4f4f, rgb(48, 48, 48))');
            setBB('3px solid #414141');
        }
    },[selected])

    return(
        <div className="NavbarContent" style={{
            background: BK1
        }}>
            {openPanel === 'login' && <AuthPanel switcher={setOpenPanel}> 
                <div>
                    <LoginPage/>
                </div>
            </AuthPanel>}

            {openPanel === 'logout' && <AuthPanel switcher={setOpenPanel}> 
                <div>
                    <LogoutPage/>
                </div>
            </AuthPanel>}

            <FlexBetween>
                    <div className="SettingLogo">
                        <img src="http://localhost:3001/assets/commons/setting.png" alt="Setting" height="50%"/>
                    </div>

                    <div className="Dota2Logo" 
                        onClick={() => {
                            navigate('/');
                            dispatch(changePage({newPage: 'home'}));
                        }}

                        style={{
                            background: BK2,
                            borderBottom: BB
                    }}>
                        <img src="http://localhost:3001/assets/commons/dota2_logo.png" alt="Dota2 Logo" height="75%"/>
                    </div>

                    <div className="NavbarItems">
                        <NavbarContentItem name="英雄" first={true} goto='/allhero'/>
                        <NavbarContentItem name="社区" goto="/community"/>
                        <NavbarContentItem name="观战" />
                        <NavbarContentItem name="训练" goto='/train'/>
                        <NavbarContentItem name="导入" goto='/importcenter'/>
                        <div style={{
                            height:'100%',
                            borderLeft:'3px solid #414141',
                            marigin: '0px'
                        }}><br/></div>
                    </div>

                    <div className="NavbarItems2">
                        <div style={{
                            height:'100%',
                            borderLeft:'3px solid rgb(17, 17, 17)',
                            marigin: '0px'
                        }}><br/></div>
                        <NavbarContentItem2 >
                            <MailIcon/>
                        </NavbarContentItem2>
                        <NavbarContentItem2></NavbarContentItem2>
                        <NavbarContentItem2></NavbarContentItem2>
                        {user ? <NavbarContentItem2 
                                onClick={() => {setOpenPanel('logout');}}
                                background="radial-gradient(circle at center, rgba(255, 0, 0, 0.45), rgba(255, 0, 0, 0.2))">
                                <PowerSettingsNewIcon/>
                            </NavbarContentItem2> :
                            <NavbarContentItem2 
                                onClick={() => {setOpenPanel('login');}}
                                background="radial-gradient(circle at center, rgba(100, 255, 100, 0.45), rgba(100, 255, 100, 0.2))">
                                <PowerSettingsNewIcon/>
                            </NavbarContentItem2>}
                    </div>

            </FlexBetween>
        </div>
    )
};

export default Navbar;