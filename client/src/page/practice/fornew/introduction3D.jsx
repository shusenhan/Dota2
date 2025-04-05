import { Canvas, useFrame}  from '@react-three/fiber';
import './introduction3D.css';
import {  ScrollControls, useScroll } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Descrition from './textcard';
import { NPCs } from '../../../component/npc';
import { lazy, Suspense } from 'react';
import { AnimationProvider } from '../../../component/useAnimations';
import { useParams } from 'react-router-dom';

const Creep_Bad_Melee = lazy(() => import('../../../component/3D/creep_bad_melee'));
const Creep_Bad_Siege = lazy(() => import('../../../component/3D/creep_bad_siege'));
const Radiant_Ranged = lazy(() => import('../../../component/3D/creep_radiant_range'));

const N_Creep_Beast = lazy(() => import('../../../component/3D/n_creep_beast'));
const N_Creep_Centaur_Lrg = lazy(() => import('../../../component/3D/n_creep_centaur_lrg'));
const N_Creep_Black_Drake = lazy(() => import('../../../component/3D/n_creep_black_drake'));
const N_Creep_Black_Dragon = lazy(() => import('../../../component/3D/n_creep_black_dragon'));

const creep = [{model: Creep_Bad_Melee, alignment: 0}, {model: Radiant_Ranged, alignment: 0}, {model: Creep_Bad_Siege, alignment: 0}]
const n_creep = [{model: N_Creep_Beast, alignment: 0}, {model: N_Creep_Black_Drake, alignment: -2}, {model: N_Creep_Black_Dragon, alignment: -2}, {model: N_Creep_Centaur_Lrg, alignment: 0}]

const ModelGroup = () => {
    const { type } = useParams();
    const ref = useRef();
    const timeline = useRef();
    const scroll = useScroll();
    const [activeIndex, setActiveIndex] = useState(null);
    const groupsRef = useRef([]);
    const [rotationSpeed, setRotationSpeed] = useState(0);
    const [currentList, setCurrentList] = useState(null);


    useFrame(() => {
        if(timeline.current){
            timeline.current.seek(scroll.offset * timeline.current.duration());
        
            const index = Math.floor(scroll.offset * currentList.length);
            setActiveIndex(index);

            if (groupsRef.current[activeIndex]) {
                groupsRef.current[activeIndex].rotation.y += rotationSpeed;
            }
        }
    });

    useEffect(() => {
        if(type === 'creep'){
            setCurrentList(creep);
        }
        else if(type === 'ncreep'){
            setCurrentList(n_creep);
        }
    }, [type])

    useEffect(() => {
        if(currentList){
            timeline.current = gsap.timeline();

            timeline.current.to(
                ref.current.position,
                {
                    duration: 2,
                    x: -((currentList.length - 1) * 8) * 0.7,
                    ease: 'none'
                },
                0
            )
        }
    }, [currentList]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!groupsRef.current[activeIndex]) return;
            switch (event.key) {
                case 'a':
                    setRotationSpeed(-0.02);
                    break;
                case 'd':
                    setRotationSpeed(0.02);
                    break;
                default:
                    break;
            }
        };

        const handleKeyUp = (event) => {
            setRotationSpeed(0);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [activeIndex]);

    return(
        <group 
            position={[0, -2, 0]} 
            scale={0.7} 
            ref={ref} 
        >
            {currentList && currentList.map((AComponent, index) => 
                <group 
                    key={index} 
                    position={[8 * index, AComponent.alignment, 0]}
                    ref={el => groupsRef.current[index] = el}    
                >
                    <Suspense fallback={null}>  
                        <AComponent.model/>
                    </Suspense>
                </group>
            )}
        </group>
    )
}

const Introduction3D = () => {
    const { type } = useParams();
    const [currentDescription, setCurrentDescription] = useState(null);
    
    useEffect(() => {
        if(type === 'creep'){
            setCurrentDescription(NPCs.creeps)
        }
        else if(type === 'ncreep'){
            setCurrentDescription(NPCs.n_creeps)
        }
    }, [type])

    return(
        <AnimationProvider>
            <div className='Introduction3DContent'>
                <Canvas camera={{ fov: 60, position: [0, 0, 5]}}>
                    <rectAreaLight width={4} height={4} intensity={1.6} position={[0, 0, 5]} lookAt={[0, 0, 0]}/>
                    <ambientLight intensity={1.6} position={[0, 10, 10]} lookAt={[0, 0, 0]}/>
                    {currentDescription && <ScrollControls className='ScrollController' damping={0.35} pages={currentDescription.length}>
                        <ModelGroup/>
                        <Descrition descriptions={currentDescription}/>
                    </ScrollControls>}
                </Canvas>
            </div>
        </AnimationProvider>
    )
}

export default Introduction3D;