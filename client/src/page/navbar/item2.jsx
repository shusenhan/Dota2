import { Box } from "@mui/material";

const NavbarContentItem2 = ({children, background}, props) => {
    return(
        <Box sx={{
            color: 'rgb(116, 116, 116)',
            position:'relative',
            height:'100%',
            width:'25%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderLeft:'3px solid #313131',
            borderRight:'3px solid rgb(17, 17, 17)',
            borderBottom:'1px solid #333333',
            marigin: '0px',
            background: background,
        }}>
            <Box onClick={() => {
                }}

                sx={{
                    color: 'rgb(116, 116, 116)',
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
                {children}
            </Box>
        </Box>
    )
};

export default NavbarContentItem2;