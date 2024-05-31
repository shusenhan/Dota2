import { Box } from "@mui/material";

const InputPanel = ({children, switcher}) => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex:5
        }}>
            <Box sx={{
                height: '50%',
                width: '50%',
                // backgroundColor: 'black',
                position: 'relative',
            }}>
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: 10,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgb(50, 50, 50, 0.5)',
                    padding: '1.5%',
                    border: '3px solid rgb(161, 161, 161, 0.5)',
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
                }}>
                </Box>
            </Box>
        </Box>
    )
};

export default InputPanel;