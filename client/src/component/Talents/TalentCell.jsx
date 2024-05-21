import { Box } from "@mui/material";
import { useState } from "react";

const TalentCell = ({text, L=true}) => {
    const percentage = L === true ? '100%': '0%'
    const [color, setColor] = useState('rgba(0, 0, 0, 0.87)');

    const ChangeColor = () => {
        setColor('#EDC514');
    }

    return(
        <Box 
            onClick={ChangeColor}
            sx={{
                backgroundColor: '',
                background: `radial-gradient(circle at ${percentage} center, #848484, #3E3E3E)`,
                height:'36px',
                width:'170px',
                display:'flex',
                justifyContent: 'center',
                color: color,
                fontSize: '13px',
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