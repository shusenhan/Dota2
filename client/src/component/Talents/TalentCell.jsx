import { Box } from "@mui/material";

const TalentCell = ({text, L=true}) => {
    const percentage = L === true ? '100%': '0%'

    return(
        <Box sx={{
            backgroundColor: '',
            background: `radial-gradient(circle at ${percentage} center, #848484, #3E3E3E)`,
            height:'36px',
            width:'170px',
            display:'flex',
            justifyContent: 'center',
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