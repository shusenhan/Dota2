import { Box } from "@mui/material";
import { useState } from "react";

const LocationCell = ({children, text}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Box onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.2)',
                }
        }}> 
            <div style={{
                position: 'relative'
            }}>
                {isHovered && <div style={{
                    position: 'absolute',
                    left: '100%',
                    width: '20vh'
                }}>
                    视频和描述
                </div>}
            </div>
            {children}
        </Box>
    )
}

export default LocationCell;