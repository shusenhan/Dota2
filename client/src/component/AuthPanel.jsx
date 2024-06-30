import { Box } from "@mui/material";

const AuthPanel = ({children, switcher, height='2150%', top='0%'}) => {
    return (
        <Box sx={{
            height: height,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: top,
            left: 0,
            zIndex:15
        }}>
            <Box sx={{
                height: '50%',
                width: '50%',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '40%',
                    left: '50%',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgb(50, 50, 50, 0.5)',
                }}>
                    {children}
                </Box>

                <Box 
                    onClick={() => switcher(false)}
                    sx={{  
                        position: 'absolute',
                        height: '200%',
                        width: '200%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        top: '-50%',
                        left: '-50%',
                }}></Box>
            </Box>
        </Box>
    )
}

export default AuthPanel;