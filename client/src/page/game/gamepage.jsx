import './gamepage.css';
import { useGame } from '../../component/useGame';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { lazy, Suspense } from 'react';
import GameUI from './UI.jsx';

const MeleeCreep = lazy(() => import('./game1.jsx'))

const GamePage = () => {
    const {showGame} = useGame();

    return(
        <div className='GamePageContent' style={{zIndex: showGame}}>
            <Canvas shadows camera={{ position: [30, 30, 30], fov: 30 }}>
                <ambientLight/>
                <ScrollControls style={{overflow: 'hidden'}}>
                    <GameUI/>
                    <Suspense fallback={null}>
                        <MeleeCreep/>
                    </Suspense>
                </ScrollControls>
            </Canvas>
        </div>
    )
}

export default GamePage;