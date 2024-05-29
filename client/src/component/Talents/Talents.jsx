import TalentCell from "./TalentCell";
import { Typography } from "@mui/material";

const Talents = () => {
    return(
        <div style={{
            height: '100%',
            width: '100%',
            position:'absolute',
            zIndex: 5,
            background: 'radial-gradient(circle at 10% 25%, #464646, #303030)',
            boxShadow: '0px 0px 10px 5px #000000',
        }}>
            <div style={{
                height: '100%',
                width: '100%',
                position:'relative',
                color: 'white',
                fontSize: '20px',
                
            }}>
                <Typography sx={{
                    fontSize: '2vh',
                    color: 'white',
                    height: '18%',
                    textAlign: 'center',
                    paddingTop: '2%',
                    letterSpacing: '0.5em',
                }}>
                    天赋树
                </Typography>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5%',
                    padding: '0.75% 3%',
                    height: '20%'
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '9%',
                        height: '14%',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontSize: '2vh',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>20</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5%',
                    padding: '0.75% 3%',
                    height: '20%'
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '9%',
                        height: '14%',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontSize: '2vh',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>20</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5%',
                    padding: '0.75% 3%',
                    height: '20%'
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '9%',
                        height: '14%',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontSize: '2vh',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>20</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '5%',
                    padding: '0.75% 3%',
                    height: '20%'
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '9%',
                        height: '14%',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontSize: '2vh',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>20</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                
            </div>
        </div>
    )
}

export default Talents;