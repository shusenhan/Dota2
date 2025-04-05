import { usePlane } from "@react-three/cannon";
import { useLoader } from "@react-three/fiber";
import { memo } from "react";
import { RepeatWrapping, TextureLoader } from "three";

const PlaneMesh = memo(({onPlaneClick}) => {
    const texture = useLoader(TextureLoader, 'http://localhost:3001/assets/texture/grass_00_color_psd_5b8b9f90.png')
    texture.repeat.set(8, 8);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;

    const [refPlane] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0],
        collisionFilterGroup: 2,
        collisionFilterMask: [1,2],
    }));

    return (
        <mesh ref={refPlane} onClick={onPlaneClick}>
            <planeGeometry args={[100, 100]} />
            <meshStandardMaterial color="lightblue" map={texture}/>
        </mesh>
    );
})

export default PlaneMesh;