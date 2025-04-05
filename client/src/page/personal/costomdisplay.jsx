import { Canvas }  from '@react-three/fiber';
import './personalthing.css';
import { OrbitControls } from '@react-three/drei';
import { Dire_Tower_Crownfall } from '../../component/3D/dire_tower_crownfall';

const PersonalThing = () => {
    return(
        <div className='PersonalThingContent'>
            <Canvas>
                <ambientLight intensity={1}/>
                <OrbitControls/>
                <Dire_Tower_Crownfall/>
            </Canvas>
        </div>
    )
}

export default PersonalThing