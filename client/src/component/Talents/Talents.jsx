import TalentCell from "./TalentCell";
import { Typography } from "@mui/material";

const Talents = () => {
    return(
        <div>
            <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                height: '200px',
                position:'relative'
            }}>
                <Typography sx={{
                    fontSize: '18px',
                    color: 'white'
                }}>
                    天赋树
                </Typography>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    margin: '5px 5px',
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>25</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    margin: '5px 5px',
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>20</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    margin: '5px 5px',
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>15</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    margin: '5px 5px',
                }}>
                    <TalentCell></TalentCell>
                    <div style={{
                        position: 'absolute',
                        display:'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#2F2F2F',
                        color: '#EDC514',
                        borderRadius: '15px',
                        border: '3px solid #555555',
                        fontWeight: 'bold',
                        textShadow: '0px 0px 5px #EDC514'
                    }}>10</div>
                    <TalentCell L={false}></TalentCell>
                </div>
                <div style={{
                    position: 'absolute',
                    background: 'rgba(0, 0, 0, 0.85)',
                    height: '10px',
                    width: '20px',
                    right: '175px',
                    bottom: '-10px'
                }}>
                </div>
            </div>

            <div>
                <img src='http://localhost:3001/assets/commons/talents_tree_full.png' style={{
                    width: '64px',
                    height: '64px',
                    position: 'relative',
                    zIndex: '1'
                }}/>
            </div>
        </div>
    )
}

export default Talents;