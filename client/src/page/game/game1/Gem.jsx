import { useBox } from "@react-three/cannon";
import { Yellow_Gem } from "../../../component/3D/Diggers_divining_rod_gem_topaz2";
import { useState } from "react";

const Gem = () => {
    const [visible, setVisible] = useState(true)

    const [refBox, apiBox] = useBox(() => ({
        mass: 0,
        type: 'Dynamic',
        args: [1, 0.5, 1],
        position: [-10, 1, -10],
        collisionFilterGroup: 2,
        collisionFilterMask: 2,
        userData:{
            score: 10
        },
        onCollide: () => {
            console.log('124142')
            setVisible(false)
        }
    }));

    return (
        <>
            { visible && 
            <>
                <mesh ref={refBox}>
                    <Yellow_Gem/>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshNormalMaterial />
                </mesh>
            </>}
        </>
    );
}

export default Gem;
