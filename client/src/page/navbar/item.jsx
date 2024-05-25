import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { changePage } from "../../state/state";
import { useSelector, useDispatch } from "react-redux";

const NavbarContentItem = ({name, first=false, goto='/'}) => {
    const dispatch = useDispatch();
    const borderLeft = !first ? '3px solid #414141' : 'none';
    const navigate = useNavigate();
    const selected = useSelector(state => state.selectedPage);
    const fontColor = selected === name ? 'rgb(215, 215, 215)' : 'rgb(116, 116, 116)';

    return (
        <Box sx={{
            color: fontColor,
            position:'relative',
            height:'100%',
            width:'20%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderLeft:{borderLeft},
            borderRight:'3px solid rgb(17, 17, 17)',
            // borderBottom:'3px solid #414141',
            marigin: '0px',
            
        }}>
            <Box onClick={() => {
                    navigate(goto);
                    dispatch(changePage({newPage: name}));
                }}

                sx={{
                    color: fontColor,
                    position:'relative',
                    height:'100%',
                    width:'100%',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    '&:hover':{
                        textShadow:'0 0 5px #27a3f5',
                        color:'rgb(215, 215, 215)',
                        cursor:'pointer'
                    },
                    marigin: '0px',
                    
            }}>

                <Box style={{
                    position:'relative',
                    zIndex:2,
                    textShadow: (selected === name ? '0 0 5px #27a3f5' : '')
                }}>
                    {name}
                </Box>
            </Box>

            {selected === name && <Box style={{
                    position:'absolute',
                    width:'200%',
                    height:'600%',
                    borderRadius:'50%',
                    zIndex:10,
                    background: 'radial-gradient(circle, rgba(39, 163, 245, 0.2) 15%, rgba(0, 0, 0, 0) 50%)',
                    pointerEvents:'none',
                }}>
            </Box>}
        </Box>
    )
};

export default NavbarContentItem;