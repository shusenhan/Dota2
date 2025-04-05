import { Scroll } from "@react-three/drei"
import './UI.css';
import UploadIcon from '@mui/icons-material/Upload';
import { useGame } from "../../component/useGame";

const GameUI = () => {
    const {HideGame} = useGame();

    return(
        <Scroll html>
            <div className="GameUIContent">
                <div className="GameUITop">
                    <div className='GameUIHiddenGameButton' onClick={() => HideGame()}>
                        <UploadIcon sx={{fontSize: '3vh'}}/>
                    </div>
                </div>

                <div className='GameUIAttributePanel'>
                    <div className="GameUIRoleName">
                        近战小兵
                    </div>
                    <div className="GameUIMainInfo">
                        <div className="GameUILevel">
                            <div className="GameUILevel2">
                                15
                            </div>
                        </div>
                        <div className="GameUIBasicInfo"
                            style={{
                                background: 'url(http://localhost:3001/assets/npc/dire_creep_melee.jpg) center/cover'
                            }}
                        >
                            <div className="GameUIOtherAttribute">
                                <div className="GameUIOtherAttribute2">

                                </div>
                            </div>

                            <div className="GameUIThreeAttribute">

                            </div>
                        </div>
                        <div className="GameUIMiddle">

                        </div>
                        <div className="GameUIInventory">

                        </div>
                    </div>
                </div>
            </div>
        </Scroll>
    )
}

export default GameUI;