import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HeroCell = ({engName, cnName, importing=false}) => {
    const navigate = useNavigate();

    return(
        <Box 
            onClick={() => {importing ? navigate(`\import?heroName=${engName}`) : navigate(`/heroinfo?heroName=${engName}`)}}
            sx={{
                backgroundImage: `url(http://localhost:3001/assets/heros/${engName}_icon.webp)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontSize: '8px',
                lineHeight: '10px',
                color: 'rgba(0, 0, 0, 0)',
                fontWeight: 'bold',
                transition: 'transform 0.3s ease',
                '&:hover': {
                    transform: 'scale(2)',
                    color: 'gold',
                }
        }}>
            <Box  
                sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
            }} >  
                {cnName.split('').map((char, index) => (  
                    <Box  
                        key={index} 
                        sx={{  
                            margin: '0px'
                        }}  
                    >  
                        {char}  
                    </Box>  
                ))}  
            </Box>  
        </Box>
    )
}

export default HeroCell;