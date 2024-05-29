import { Box } from "@mui/material";
import { useState } from "react";

const TalentCell = ({text, L=true}) => {
    const percentage = L === true ? '100%': '0%'
    const [color, setColor] = useState('rgba(141, 141, 141, 0.87)');

    const ChangeColor = () => {
        setColor('#EDC514');
    }

    return(
        <Box 
            onClick={ChangeColor}
            sx={{
                background: `radial-gradient(circle at ${percentage} center, #363636, #202020)`,
                height:'100%',
                width:'100%',
                display:'flex',
                justifyContent: 'center',
                color: color,
                fontSize: '1.5vh',
                alignItems: 'center',
                '&:hover': {
                    color: 'white',
                    background: `radial-gradient(circle at ${percentage} center, #E6D801, #3E3A01)`
                }
        }}>
            天赋
        </Box>
    )
}

export default TalentCell;