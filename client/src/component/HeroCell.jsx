import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroCell = ({engName, cnName}) => {
    const navigate = useNavigate();

    return(
        <Box 
            onClick={() => {navigate('\hero')}}
            sx={{
                backgroundImage: `url(http://localhost:3001/assets/heros/${engName}_icon.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '110px',
                height: '62px',
                display: 'grid',
                gridTemplateRows: '1fr auto',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(1.2)'
                }
        }}>
            <span style={{
                alignSelf: 'end',
                color: '#F9BA1A',
                fontSize: '13px',
                fontWeight: 700
            }}>{cnName}</span>
        </Box>
    )
}

export default HeroCell;