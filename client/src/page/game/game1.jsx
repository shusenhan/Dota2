import { Physics, usePlane, useBox } from "@react-three/cannon";
import { Vector3, Quaternion, Euler } from "three";
import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import Gem from "./game1/Gem.jsx";
import Creep_Bad_Melee from "../../component/3D/creep_bad_melee";
import PlaneMesh from "./game1/PlaneMesh";
import Trees from "./game1/Trees";


export const Experience = () => {
  const boxPositionRef = useRef([0, 0.5, 0]);
  const targetPositionRef = useRef([0, 0.5, 0]);
  const shouldUpdateOrientation = useRef(true);
  const {camera} = useThree();
  const [animation, setAnimation] = useState('idle'); 
  const orientationRef = useRef(new Euler());
  const lastAnimation = useRef('idle');
  
  
  const BoxMesh = () => {
    const [refBox, apiBox] = useBox(() => ({
      rotation: [orientationRef.current.x, orientationRef.current.y, orientationRef.current.z],
      args: [2, 1.3, 2],
      position: boxPositionRef.current,
    }));

    const [refBox2, apiBox2] = useBox(() => ({
      position: boxPositionRef.current,
      isTrigger: true,
      args: [5, 1, 5],
      collisionFilterGroup: 2,
      collisionFilterMask: 2,
      userData:{hp: 100} ,
      onCollide: (event) => {
        const damage = event.body
        console.log('触发: ', damage);
      }
    }));

    useFrame(() => {
      if(refBox.current){
        const [ x, y, z ] = boxPositionRef.current;
        camera.position.set(x + 30, y + 30, z + 30);
      }
    })

    useEffect(() => {
      const speed = 0.15;
      const direction = new Vector3();

      const unsubscribe = apiBox.position.subscribe((currentPosition) => {
        const target = new Vector3(...targetPositionRef.current);
        const current = new Vector3(...currentPosition);

        direction.subVectors(target, current).normalize();
        direction.y = 0;

        const distance = current.distanceTo(target);

        if (!direction.equals(new Vector3(0, 0, 0))  && distance > 1) {
          apiBox.rotation.set(orientationRef.current.x, orientationRef.current.y, orientationRef.current.z);
        }
        
        if (current.distanceTo(target) < speed) {
          apiBox.position.set(target.x, target.y, target.z);
          apiBox2.position.set(target.x, target.y, target.z);
          boxPositionRef.current = [target.x, target.y, target.z];
          shouldUpdateOrientation.current = true;
        } 
        else {
          const move = direction.multiplyScalar(speed);
          apiBox.position.set(current.x + move.x, current.y + move.y, current.z + move.z);
          apiBox2.position.set(current.x + move.x, current.y + move.y, current.z + move.z);
          boxPositionRef.current = [current.x + move.x, current.y + move.y, current.z + move.z];
          shouldUpdateOrientation.current = false;
        }

        const newAnimation = distance > 0.2 ? '@@run' : 'idle';

        if (newAnimation !== lastAnimation.current) {
            setAnimation(newAnimation);
            lastAnimation.current = newAnimation;
        }
      });

      return () => { unsubscribe();};
    }, []);

    return (
      <group>
        <mesh ref={refBox}>
          <Creep_Bad_Melee anim={animation}/>
        </mesh>
        <mesh ref={refBox2}>
          <boxGeometry args={[3, 1, 3]}/>
          <meshNormalMaterial/>
        </mesh>
      </group>
    );
  }

  const onPlaneClick = useRef(null);

  useEffect(() => {
    onPlaneClick.current = (event) => {
      const {point} = event.intersections[0];
      targetPositionRef.current = [point.x, 0.5, point.z];
      shouldUpdateOrientation.current = true;
  
      const direction = new Vector3();
      const target = new Vector3(...targetPositionRef.current);
      const current = new Vector3(...boxPositionRef.current);
      direction.subVectors(target, current).normalize();
      direction.y = 0;
  
      const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 0, 1), direction);
      orientationRef.current.setFromQuaternion(quaternion);
    }
  }, [])
  

  return (
    <>
      <Physics>
        <PlaneMesh onPlaneClick={onPlaneClick.current}/>
        <BoxMesh/>
          <Gem/>
      </Physics>
      <Trees/>
    </>
  );
};

export default Experience;